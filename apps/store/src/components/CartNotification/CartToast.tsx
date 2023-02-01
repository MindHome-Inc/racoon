import styled from '@emotion/styled'
import { useTranslation } from 'next-i18next'
import { forwardRef, useImperativeHandle, useState } from 'react'
import { Space, Dialog, mq, theme } from 'ui'
import { MENU_BAR_HEIGHT_DESKTOP, MENU_BAR_HEIGHT_MOBILE } from '@/components/Header/HeaderStyles'
import { PageLink } from '@/utils/PageLink'
import { ButtonNextLink } from '../ButtonNextLink'
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

export const CartNotificationContent = ({ name, price, startDate, onClose }: Props) => {
  const { t } = useTranslation('purchase-form')

  return (
    <DialogContent onClose={onClose}>
      <DialogContentWrapper>
        <ProductItem name={name} price={price} startDate={startDate} />
        <Space y={0.5}>
          <ButtonNextLink href={PageLink.cart()} variant="primary">
            {t('CART_TOAST_CART_LINK')}
          </ButtonNextLink>

          <ButtonNextLink href={PageLink.store()} onClick={onClose} variant="ghost">
            {t('CART_TOAST_STORE_LINK')}
          </ButtonNextLink>
        </Space>
      </DialogContentWrapper>
    </DialogContent>
  )
}

const DialogContent = styled(Dialog.Content)({
  marginTop: MENU_BAR_HEIGHT_MOBILE,
  [mq.lg]: {
    marginTop: MENU_BAR_HEIGHT_DESKTOP,
    display: 'flex',
    justifyContent: 'flex-end',
  },
})

const DialogContentWrapper = styled.div({
  position: 'relative',
  display: 'flex',
  flexDirection: 'column',
  gap: theme.space.lg,

  paddingInline: theme.space.md,
  paddingTop: theme.space.lg,
  paddingBottom: theme.space.xs,

  borderBottomLeftRadius: theme.radius.md,
  borderBottomRightRadius: theme.radius.md,

  backgroundColor: theme.colors.light,
  boxShadow: '0px 1px 2px rgba(0, 0, 0, 0.15)',
  [mq.lg]: {
    margin: `${theme.space.xs} ${theme.space.md} 0 0`,
    borderRadius: theme.radius.md,
    maxWidth: '28rem',
  },
})
