import { useCallback } from 'react'
import { useShopSessionAuthenticateMutation } from '@/services/apollo/generated'
import { loginMemberSeBankId } from '@/services/authApi/login'
import { exchangeAuthorizationCode } from '@/services/authApi/oauth'
import { saveAccessToken } from '@/services/authApi/persist'
import { BankIdState } from '@/services/bankId/bankId.types'
import { apiStatusToBankIdState, bankIdLogger } from '@/services/bankId/bankId.utils'
import { BankIdDispatch } from '@/services/bankId/bankIdReducer'

type Options = {
  shopSessionId?: string
  ssn?: string
  dispatch: BankIdDispatch
}
export const useBankIdLogin = ({ shopSessionId, ssn, dispatch }: Options) => {
  const [authenticateShopSession] = useShopSessionAuthenticateMutation()
  return useCallback(async () => {
    if (!shopSessionId || !ssn) throw new Error('Must have shopSession with ID and customer SSN')

    bankIdLogger.debug('Starting BankId login')
    dispatch({ type: 'operationStateChange', nextOperationState: BankIdState.Starting })
    try {
      const authorizationCode = await loginMemberSeBankId(ssn, (status) => {
        dispatch({
          type: 'operationStateChange',
          nextOperationState: apiStatusToBankIdState(status),
        })
      })
      const accessToken = await exchangeAuthorizationCode(authorizationCode)
      saveAccessToken(accessToken)
      bankIdLogger.debug('Got access token, authenticating shopSession')
      await authenticateShopSession({ variables: { shopSessionId } })
      bankIdLogger.debug('shopSession authenticated')
    } catch (error) {
      bankIdLogger.warn('Failed to authenticate', { error })
      dispatch({ type: 'error', error })
    }
  }, [authenticateShopSession, dispatch, shopSessionId, ssn])
}
