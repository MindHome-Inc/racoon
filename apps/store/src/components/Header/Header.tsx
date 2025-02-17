import styled from '@emotion/styled'
import { motion, Transition } from 'framer-motion'
import Link from 'next/link'
import { HedvigLogo, mq, theme } from 'ui'
import { PageLink } from '@/utils/PageLink'
import { zIndexes } from '@/utils/zIndex'
import { useScrollState } from '../../utils/useScrollState'
import { MENU_BAR_HEIGHT_DESKTOP, MENU_BAR_HEIGHT_MOBILE, MENU_BAR_HEIGHT_PX } from './HeaderStyles'
import { ShoppingCartMenuItem } from './ShoppingCartMenuItem'

// Not possible to animate HSL to "transparent"
const TRANSPARENT_HSL_COLOR = 'hsla(0, 0%, 98%, 0)'

const ANIMATION_VARIANTS = {
  SLIDE_IN: {
    y: 0,
    position: 'fixed',
    backgroundColor: theme.colors.backgroundStandard,
    boxShadow: 'rgba(0, 0, 0, 0.06) 0px 2px 12px',
  },
  SLIDE_OUT: {
    position: 'fixed',
    y: '-150%',
  },
  HIDE: {
    y: '-150%',
    transition: { duration: 0 },
  },
} as const

// Source: https://easings.co · easeInOutCubic
const TRANSITION: Transition = { ease: [0.65, 0.05, 0.36, 1] }

type AnimationVariant = keyof typeof ANIMATION_VARIANTS | undefined

type HeaderProps = {
  children: React.ReactNode
  opaque?: boolean
  overlay?: boolean
}

export const Header = ({ children, opaque = false, overlay = false }: HeaderProps) => {
  const scrollState = useScrollState({ threshold: MENU_BAR_HEIGHT_PX * 2 })

  const defaultPosition = overlay ? 'absolute' : 'relative'
  const backgroundColor = opaque ? theme.colors.backgroundStandard : TRANSPARENT_HSL_COLOR

  const initial = { position: defaultPosition, backgroundColor } as const

  let animate: AnimationVariant = scrollState === 'SCROLL_UP' ? 'SLIDE_IN' : undefined
  animate = scrollState === 'BELOW' ? 'HIDE' : animate
  animate = scrollState === 'SCROLL_DOWN' ? 'SLIDE_OUT' : animate

  return (
    <GhostWrapper style={{ position: defaultPosition, backgroundColor }}>
      <Wrapper
        initial={initial}
        variants={ANIMATION_VARIANTS}
        animate={animate}
        transition={TRANSITION}
      >
        <LogoWrapper href={PageLink.home()}>
          <HedvigLogo />
        </LogoWrapper>
        <ContentWrapper>
          {children}
          <ShoppingCartMenuItem />
        </ContentWrapper>
      </Wrapper>
    </GhostWrapper>
  )
}

const GhostWrapper = styled.div({
  top: 0,
  left: 0,
  right: 0,
  zIndex: zIndexes.header,

  height: MENU_BAR_HEIGHT_MOBILE,
  [mq.lg]: { height: MENU_BAR_HEIGHT_DESKTOP },
})

export const Wrapper = styled(motion.header)({
  width: '100%',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',

  top: 0,
  zIndex: zIndexes.header,

  height: MENU_BAR_HEIGHT_MOBILE,
  paddingInline: theme.space.md,
  [mq.lg]: {
    height: MENU_BAR_HEIGHT_DESKTOP,
    paddingInline: theme.space.xl,
  },
})

const LogoWrapper = styled(Link)({
  flex: 1,
  ':active': { opacity: 0.75 },
})

const ContentWrapper = styled.div({
  display: 'flex',
  flexDirection: 'row',
  justifyContent: 'flex-end',
  alignItems: 'center',
  flex: 1,

  [mq.lg]: {
    justifyContent: 'space-between',
  },
})
