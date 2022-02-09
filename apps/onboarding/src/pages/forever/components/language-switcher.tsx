import Link from 'next/link'
import { Separate } from 'ui'
import styled from '@emotion/styled'
import { useCurrentMarket } from '@/lib/l10n'
import { useRouter } from 'next/router'

const Wrapper = styled(Separate)({
  display: 'flex',
})

const Separator = styled.div(({ theme }) => ({
  width: 1,
  height: '100%',
  backgroundColor: theme.colors.gray700,
  marginLeft: '0.5rem',
  marginRight: '0.5rem',
}))

const Anchor = styled.a<{ active: boolean }>(({ active, theme }) => ({
  textDecoration: 'none',
  '&:hover': {
    color: theme.colors.gray900,
  },
  color: active ? theme.colors.gray900 : theme.colors.gray500,
}))

export const LanguageSwitcher = () => {
  const router = useRouter()
  const { languages } = useCurrentMarket()

  return (
    <Wrapper Separator={<Separator />}>
      {languages.map((language) => (
        <Link key={language.urlParam} href={router.asPath} locale={language.urlParam} passHref>
          <Anchor active={router.locale === language.urlParam}>{language.displayName}</Anchor>
        </Link>
      ))}
    </Wrapper>
  )
}
