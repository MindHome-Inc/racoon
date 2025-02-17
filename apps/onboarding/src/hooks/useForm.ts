import { useRouter } from 'next/router'
import { FormEvent, useCallback, useEffect, useRef } from 'react'
import { useState } from 'react'
import { LOCALE_URL_PARAMS } from '@/lib/l10n/locales'
import useRouterRefresh from './use-router-refresh'

const PATH_PATTERN = new RegExp(`/(${LOCALE_URL_PARAMS.join('|')})/`)

export const hasLocale = (url: string) => {
  return PATH_PATTERN.test(url)
}

type TransitionState = 'idle' | 'submitting'

type FormState = {
  state: TransitionState
  errors: Record<string, string> | null
}

type Options = {
  action: string
  method?: 'put' | 'post' | 'patch' | 'delete'
  onSuccess?: (data: { redirectUrl?: string }) => void
  onSubmit?: (formData: FormData) => void
}

export const useForm = ({ action, method, onSuccess, onSubmit }: Options) => {
  const router = useRouter()
  const refreshData = useRouterRefresh()
  const [formState, setFormState] = useState<FormState>({ state: 'idle', errors: null })
  const formRef = useRef<HTMLFormElement>(null)

  // Reset form state when navigating away from/back to this page.
  // Safari somehow keeps the state even after the page is unmounted.
  useEffect(() => {
    const handleChangeRoute = () => setFormState({ state: 'idle', errors: null })
    router.events.on('routeChangeComplete', handleChangeRoute)
    return () => router.events.off('routeChangeComplete', handleChangeRoute)
  }, [router])

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    setFormState({ state: 'submitting', errors: null })

    try {
      const formData = new FormData(event.currentTarget)
      onSubmit?.(formData)

      // @ts-expect-error React types doesn't know about "submitter"
      if (event.nativeEvent.submitter) {
        // @ts-expect-error React types doesn't know about "submitter"
        formData.append(event.nativeEvent.submitter.name, event.nativeEvent.submitter.value)
      }

      const response = await fetch(action, {
        method: method || 'post',
        body: formData,
        credentials: 'same-origin',
      })

      if (response.ok) {
        const redirectUrl = response.redirected ? response.url : router.asPath

        onSuccess?.({ redirectUrl })

        if (response.redirected) {
          await router.push(redirectUrl, undefined, {
            locale: hasLocale(redirectUrl) ? false : undefined,
          })
        } else {
          await refreshData()
          setFormState({ state: 'idle', errors: null })
        }
      } else {
        const errors = await response.json()
        setFormState({ state: 'idle', errors })
      }
    } catch (error) {
      setFormState({ state: 'idle', errors: { form: 'Unknown error' } })
    }
  }

  const submitForm = useCallback(() => {
    if (formRef.current?.reportValidity()) {
      formRef.current?.dispatchEvent(new Event('submit', { cancelable: true, bubbles: true }))
    }
  }, [])

  const formProps = {
    action,
    method,
    onSubmit: handleSubmit,
    ref: formRef,
  }

  return { ...formState, submitForm, formProps }
}
