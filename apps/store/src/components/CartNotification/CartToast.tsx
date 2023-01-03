import styled from '@emotion/styled'
import { useTranslation } from 'next-i18next'
import Link from 'next/link'
import { forwardRef, useImperativeHandle, useState } from 'react'
import { Heading, Space, Dialog, Button } from 'ui'
import { useShopSession } from '@/services/shopSession/ShopSessionContext'
import { PageLink } from '@/utils/PageLink'
import { ProductItem, ProductItemProps } from './ProductItem'

export type CartToastAttributes = {
  publish: (product: ProductItemProps) => void
}

export const CartToast = forwardRef<CartToastAttributes>((_, forwardedRef) => {
  const [product, setProduct] = useState<ProductItemProps | null>(null)

  const isOpen = product !== null
  const handleClose = () => setProduct(null)

  useImperativeHandle(forwardedRef, () => ({
    publish: (product: ProductItemProps) => setProduct(product),
  }))

  return (
    <Dialog.Root open={isOpen}>
      {product && <CartNotificationContent onClose={handleClose} {...product} />}
    </Dialog.Root>
  )
})

CartToast.displayName = 'CartToast'

type Props = ProductItemProps & {
  onClose: () => void
}

const CartNotificationContent = ({ name, price, onClose }: Props) => {
  const { t } = useTranslation('purchase-form')
  const { shopSession } = useShopSession()
  const cartLineCount = shopSession?.cart.entries.length ?? 1

  return (
    <Dialog.Content onClose={onClose}>
      <DialogContentWrapper y={1.5}>
        <Heading as="h2" variant="standard.18">
          {t('CART_TOAST_HEADING')}
        </Heading>
        <ProductItem name={name} price={price} />

        <Space y={0.5}>
          <Link href={PageLink.cart()} passHref legacyBehavior>
            <Button variant="primary">{t('CART_TOAST_CART_LINK', { count: cartLineCount })}</Button>
          </Link>

          <Link href={PageLink.store()} passHref legacyBehavior>
            <Button variant="ghost" onClick={onClose}>
              {t('CART_TOAST_STORE_LINK')}
            </Button>
          </Link>
        </Space>
      </DialogContentWrapper>
    </Dialog.Content>
  )
}

const DialogContentWrapper = styled(Space)(({ theme }) => ({
  paddingTop: theme.space[5],
  paddingLeft: theme.space[3],
  paddingRight: theme.space[3],
  paddingBottom: theme.space[3],
  backgroundColor: theme.colors.white,
  textAlign: 'center',
}))
