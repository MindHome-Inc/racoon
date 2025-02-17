import styled from '@emotion/styled'
import * as NavigationMenuPrimitive from '@radix-ui/react-navigation-menu'
import { mq, theme } from 'ui'

export const MENU_BAR_HEIGHT_MOBILE = '3rem'
export const MENU_BAR_HEIGHT_DESKTOP = '4rem'
export const MENU_BAR_HEIGHT_PX = 64

export const focusableStyles = {
  cursor: 'pointer',
  '&:focus-visible': {
    outline: `2px solid ${theme.colors.gray900}`,
  },
}

export const Navigation = styled(NavigationMenuPrimitive.Root)({
  fontSize: theme.fontSizes.xl,

  [mq.lg]: {
    fontSize: theme.fontSizes.md,
    top: 0,
  },
})

export const NavigationMenuPrimitiveItem = styled(NavigationMenuPrimitive.Item)({
  ':not(:last-child)': {
    borderBottom: `1px solid ${theme.colors.borderOpaque}`,
  },

  [mq.lg]: { '&&': { borderBottom: 'unset' } },
})

export const NavigationTrigger = styled(NavigationMenuPrimitive.Trigger)({
  paddingBlock: theme.space.lg,
  display: 'flex',
  alignItems: 'center',
  gap: theme.space.xs,
  ...focusableStyles,

  [mq.lg]: {
    paddingBlock: theme.space.xs,
    paddingInline: theme.space.md,

    borderRadius: theme.radius.sm,
    '@media (hover: hover)': {
      '&:hover': {
        backgroundColor: theme.colors.grayTranslucent100,
      },
    },

    '&[data-state="open"]': {
      backgroundColor: theme.colors.grayTranslucent100,
    },
  },
})

export const NavigationMenuSecondaryItem = styled(NavigationMenuPrimitive.Item)({
  padding: `${theme.space.md} ${theme.space.md} `,
  marginLeft: theme.space.md,

  [mq.lg]: {
    padding: `${theme.space.xs} ${theme.space.sm}`,
    margin: 0,
    borderRadius: theme.radius.sm,
    '@media (hover: hover)': {
      '&:hover': {
        backgroundColor: theme.colors.grayTranslucent100,
      },
    },
  },
})

export const NavigationMenuProductItem = styled(NavigationMenuPrimitive.Item)()

export const NavigationMenuPrimitiveContent = styled(NavigationMenuPrimitive.Content)({
  [mq.lg]: {
    position: 'absolute',
    paddingTop: `calc(${theme.space.sm} + ${theme.space.xs})`,
    left: '50%',
    transform: 'translate(-50%, 0)',
  },
})

export const NavigationMenuListWrapper = styled.div({
  paddingBottom: theme.space.lg,

  [mq.lg]: {
    backgroundColor: theme.colors.light,
    boxShadow: '0px 1px 2px rgba(0, 0, 0, 0.15)',
    borderRadius: theme.radius.sm,
    padding: theme.space.md,
  },
})

export const NavigationPrimaryList = styled(NavigationMenuPrimitive.List)({
  all: 'unset',
  listStyle: 'none',
  position: 'fixed',
  inset: `${MENU_BAR_HEIGHT_MOBILE} 0 0 0`,
  display: 'flex',
  flexDirection: 'column',
  padding: `0 ${theme.space.md} `,

  [mq.lg]: {
    position: 'static',
    flexDirection: 'row',
    alignItems: 'center',
    height: MENU_BAR_HEIGHT_DESKTOP,
    padding: theme.space.none,
    gap: theme.space.xxs,
  },
})

export const NavigationSecondaryList = styled(NavigationMenuPrimitive.List)({
  display: 'block',

  [mq.lg]: {
    padding: 0,
  },
})

export const ProductNavigationList = styled(NavigationMenuPrimitive.List)({
  display: 'grid',
  gridTemplateColumns: '1fr 1fr',
  columnGap: theme.space.md,
  rowGap: theme.space.lg,
  fontSize: theme.fontSizes.md,

  [mq.lg]: {
    columnGap: 0,
    gridTemplateColumns: 'none',
    gridAutoColumns: '7.5rem',
    gridAutoFlow: 'column',
  },
})
