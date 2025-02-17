import type { GetServerSideProps, NextPage } from 'next'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import {
  getCrossOut,
  getTotal,
  useGetDiscountDurationExplanation,
  useGetDiscountExplanation,
} from '@/components/CartInventory/CartInventory.helpers'
import { fetchCheckoutSteps } from '@/components/CheckoutHeader/CheckoutHeader.helpers'
import CheckoutPage from '@/components/CheckoutPage/CheckoutPage'
import type { CheckoutPageProps } from '@/components/CheckoutPage/CheckoutPage.types'
import { addApolloState, initializeApollo } from '@/services/apollo/client'
import { fetchCurrentShopSessionSigning } from '@/services/Checkout/Checkout.helpers'
import { SHOP_SESSION_PROP_NAME } from '@/services/shopSession/ShopSession.constants'
import { getCurrentShopSessionServerSide } from '@/services/shopSession/ShopSession.helpers'
import { useShopSession } from '@/services/shopSession/ShopSessionContext'
import { getShouldCollectEmail, getShouldCollectName } from '@/utils/customer'
import { convertToDate } from '@/utils/date'
import { isRoutingLocale } from '@/utils/l10n/localeUtils'
import { PageLink } from '@/utils/PageLink'

type NextPageProps = Omit<CheckoutPageProps, 'cart' | 'customerAuthenticationStatus'>

const NextCheckoutPage: NextPage<NextPageProps> = (props) => {
  const { shopSession } = useShopSession()
  const getDiscountExplanation = useGetDiscountExplanation()
  const getDiscountDurationExplanation = useGetDiscountDurationExplanation()

  if (!shopSession || !shopSession.customer) return null

  const { authenticationStatus } = shopSession.customer

  const cart = {
    id: shopSession.cart.id,
    cost: {
      total: getTotal(shopSession),
      crossOut: getCrossOut(shopSession),
    },
    entries: shopSession.cart.entries.map((item) => ({
      offerId: item.id,
      title: item.variant.product.displayNameFull,
      cost: item.price,
      startDate: !item.cancellation.requested ? convertToDate(item.startDate) : undefined,
      pillow: {
        src: item.variant.product.pillowImage.src,
        alt: item.variant.product.pillowImage.alt ?? undefined,
      },
      documents: item.variant.documents,
      productName: item.variant.product.name,
      data: item.priceIntentData,
    })),
    campaigns: shopSession.cart.redeemedCampaigns.map((item) => ({
      id: item.id,
      code: item.code,
      discountExplanation: getDiscountExplanation(item.discount),
      discountDurationExplanation: getDiscountDurationExplanation(
        shopSession.cart.redeemedCampaigns[0].discount,
        shopSession.cart.cost.gross,
      ),
    })),
  }

  return <CheckoutPage {...props} cart={cart} customerAuthenticationStatus={authenticationStatus} />
}

export const getServerSideProps: GetServerSideProps<NextPageProps> = async (context) => {
  const { req, res, locale } = context
  if (!isRoutingLocale(locale)) return { notFound: true }

  const apolloClient = initializeApollo({ req, res })
  const [shopSession, translations] = await Promise.all([
    getCurrentShopSessionServerSide({ apolloClient, req, res }).catch(() => null),
    serverSideTranslations(locale),
  ])
  if (!shopSession?.customer) {
    return { redirect: { destination: PageLink.home({ locale }), permanent: false } }
  }

  const { customer } = shopSession
  if (!customer.ssn) throw new Error('No SSN in Shop Session')

  const [checkoutSteps, shopSessionSigning] = await Promise.all([
    fetchCheckoutSteps({ apolloClient, shopSession }),
    fetchCurrentShopSessionSigning({ apolloClient, req }),
  ])

  const pageProps: NextPageProps = {
    ...translations,
    [SHOP_SESSION_PROP_NAME]: shopSession.id,
    ssn: customer.ssn,
    shouldCollectEmail: getShouldCollectEmail(customer),
    ...(customer.email && { suggestedEmail: customer.email }),
    shouldCollectName: getShouldCollectName(customer),
    shopSessionSigningId: shopSessionSigning?.id ?? null,
    checkoutSteps,
  }

  return addApolloState(apolloClient, { props: pageProps })
}

export default NextCheckoutPage
