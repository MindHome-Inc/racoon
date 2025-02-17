import styled from '@emotion/styled'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { Separate, theme } from 'ui'
import { useCurrentMarket } from '@/lib/l10n'

const FALLBACK_PATH = '/'

export const LanguageSwitcher = () => {
  const router = useRouter()
  const { languages } = useCurrentMarket()

  return (
    <Wrapper Separator={<Separator />}>
      {languages.map((language) => (
        <StyledLink
          key={language.urlParam}
          // avoid using `asPath` until `isReady` field is `true` (https://nextjs.org/docs/api-reference/next/router)
          href={router.isReady ? router.asPath : FALLBACK_PATH}
          locale={language.urlParam}
          active={router.locale === language.urlParam}
        >
          {language.displayName}
        </StyledLink>
      ))}
    </Wrapper>
  )
}

const Wrapper = styled(Separate)({
  display: 'flex',
  height: '1.5rem',
})

const Separator = styled.div({
  width: 1,
  height: '100%',
  backgroundColor: theme.colors.gray700,
  marginLeft: '0.5rem',
  marginRight: '0.5rem',
})

const StyledLink = styled(Link)<{ active: boolean }>(({ active }) => ({
  textDecoration: 'none',
  '&:hover': {
    color: theme.colors.gray900,
  },
  color: active ? theme.colors.gray900 : theme.colors.gray500,
}))
