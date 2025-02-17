import { ThemeProvider } from 'ui'
import { storybookFontStyles } from 'ui/src/lib/storybookFontStyles'
import { WithNextRouter } from 'storybook-addon-next-router/dist/decorators'
import { Global } from '@emotion/react'
import { RouterContext } from 'next/dist/shared/lib/router-context'
import './i18next'

export const parameters = {
  actions: { argTypesRegex: '^on[A-Z].*' },
  controls: {
    matchers: {
      color: /(background|color)$/i,
      date: /Date$/,
    },
  },
  nextRouter: {
    Provider: RouterContext.Provider,
    locale: 'en-se',
    path: '/en-se',
  },
}

export const decorators = [
  (Story) => (
    <>
      <Global styles={storybookFontStyles} />
      <ThemeProvider>
        <Story />
      </ThemeProvider>
    </>
  ),
  WithNextRouter,
]
