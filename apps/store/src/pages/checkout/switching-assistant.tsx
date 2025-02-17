import type { GetServerSideProps, NextPage } from 'next'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import { fetchCheckoutSteps } from '@/components/CheckoutHeader/CheckoutHeader.helpers'
import {
  SwitchingAssistantPage,
  SwitchingAssistantPageProps,
} from '@/components/SwitchingAssistantPage/SwitchingAssistantPage'
import { addApolloState, initializeApollo } from '@/services/apollo/client'
import { SHOP_SESSION_PROP_NAME } from '@/services/shopSession/ShopSession.constants'
import { getCurrentShopSessionServerSide } from '@/services/shopSession/ShopSession.helpers'
import { isRoutingLocale } from '@/utils/l10n/localeUtils'
import { PageLink } from '@/utils/PageLink'

type NextPageProps = SwitchingAssistantPageProps & {
  [SHOP_SESSION_PROP_NAME]: string
}

const NextSwitchingAssistantPage: NextPage<NextPageProps> = (props) => {
  return <SwitchingAssistantPage {...props} />
}

export const getServerSideProps: GetServerSideProps<NextPageProps> = async (context) => {
  const { req, res, locale } = context
  if (!isRoutingLocale(locale)) return { notFound: true }

  const apolloClient = initializeApollo({ req, res })
  const [shopSession, translations] = await Promise.all([
    getCurrentShopSessionServerSide({ apolloClient, req, res }),
    serverSideTranslations(locale),
  ])

  // TODO: check if user is authenticated

  const entries: SwitchingAssistantPageProps['entries'] = []
  shopSession.cart.entries.forEach((item) => {
    const { bankSignering, externalInsurer } = item.cancellation
    const { url, approveByDate } = bankSignering || {}

    if (!url || typeof approveByDate !== 'string') return

    const company = externalInsurer?.displayName
    if (!company) {
      console.warn('Missing company name for Banksignering cancellation', {
        entryId: item.id,
      })
      return
    }

    entries.push({
      key: item.id,
      name: item.variant.product.displayNameFull,
      company,
      url,
      date: approveByDate,
    })
  })

  if (entries.length === 0) {
    return {
      redirect: {
        destination: PageLink.confirmation({ locale, shopSessionId: shopSession.id }),
        permanent: false,
      },
    }
  }

  const checkoutSteps = await fetchCheckoutSteps({ apolloClient, shopSession })
  const pageProps = {
    ...translations,
    [SHOP_SESSION_PROP_NAME]: shopSession.id,
    entries,
    checkoutSteps,
  } satisfies NextPageProps

  return addApolloState(apolloClient, { props: pageProps })
}

export default NextSwitchingAssistantPage
