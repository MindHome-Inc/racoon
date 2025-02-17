import styled from '@emotion/styled'
import * as DialogPrimitive from '@radix-ui/react-dialog'
import { useTranslation } from 'next-i18next'
import { useRouter } from 'next/router'
import React, { useEffect } from 'react'
import { AndroidIcon, AppleIcon, Button, mq, Space, theme } from 'ui'
import { appStoreLinks } from '@/utils/appStoreLinks'
import {
  focusableStyles,
  MENU_BAR_HEIGHT_MOBILE,
  Navigation,
  NavigationPrimaryList,
} from '../HeaderStyles'

const triggerStyles = {
  ...focusableStyles,
  fontSize: theme.fontSizes.md,
  marginRight: theme.space.md,

  ':active': {
    color: theme.colors.textSecondary,
  },

  [mq.lg]: {
    display: 'none',
  },
}

export const DialogTrigger = styled(DialogPrimitive.Trigger)({
  ...triggerStyles,
})

export const DialogClose = styled(DialogPrimitive.DialogClose)({
  ...triggerStyles,
})

const ButtonWrapper = styled(Space)({
  display: 'grid',
  gridTemplateColumns: '1fr 1fr',
  paddingTop: theme.space.lg,
})

const StyledAppleIcon = styled(AppleIcon)({
  marginRight: theme.space.xs,
})

const StyledAndroidIcon = styled(AndroidIcon)({
  marginRight: theme.space.xs,
})

export type TopMenuMobileProps = {
  isOpen: boolean
  setIsOpen: (isOpen: boolean) => void
  children: React.ReactNode
}

export const TopMenuMobile = ({ children, isOpen, setIsOpen }: TopMenuMobileProps) => {
  const router = useRouter()
  const { t } = useTranslation('common')

  useEffect(() => {
    const closeDialog = () => setIsOpen(false)
    router.events.on('routeChangeStart', closeDialog)
    return () => router.events.off('routeChangeStart', closeDialog)
  }, [router.events, setIsOpen])

  return (
    <>
      <DialogPrimitive.Root open={isOpen} onOpenChange={setIsOpen}>
        {isOpen ? (
          <DialogClose>{t('NAV_MENU_DIALOG_CLOSE')}</DialogClose>
        ) : (
          <DialogTrigger>{t('NAV_MENU_DIALOG_OPEN')}</DialogTrigger>
        )}
        <DialogContent>
          <Navigation>
            <NavigationPrimaryList>
              <div>{children}</div>
              <ButtonWrapper x={0.25}>
                <Button
                  href={appStoreLinks.apple}
                  target="_blank"
                  rel="noopener noreferrer"
                  variant="secondary"
                  size="medium"
                >
                  <StyledAppleIcon />
                  App Store
                </Button>
                <Button
                  href={appStoreLinks.google}
                  target="_blank"
                  rel="noopener noreferrer"
                  variant="secondary"
                  size="medium"
                >
                  <StyledAndroidIcon />
                  Google Play
                </Button>
              </ButtonWrapper>
            </NavigationPrimaryList>
          </Navigation>
        </DialogContent>
      </DialogPrimitive.Root>
    </>
  )
}

export const DialogContent = (props: DialogPrimitive.DialogContentProps) => {
  return (
    <DialogPrimitive.Portal>
      <StyledDialogOverlay />
      <DialogPrimitive.Content {...props} />
    </DialogPrimitive.Portal>
  )
}

const StyledDialogOverlay = styled(DialogPrimitive.Overlay)({
  position: 'fixed',
  inset: 0,
  top: MENU_BAR_HEIGHT_MOBILE,
  backgroundColor: theme.colors.light,
})
