import styled from '@emotion/styled'
import { Heading, Space, theme } from 'ui'

type Props = {
  children: React.ReactNode
  Header?: React.ReactNode
}

export const CheckoutPaymentPage = ({ children, Header }: Props) => {
  return (
    <div>
      <Space y={3}>
        <HeaderWrapper>{Header ?? null}</HeaderWrapper>

        <PageHeader>
          <Heading as="h1" variant="standard.32">
            Payment
          </Heading>
        </PageHeader>

        <Main>{children}</Main>
      </Space>
    </div>
  )
}

const HeaderWrapper = styled.header({
  padding: theme.space.sm,
})

const PageHeader = styled.header({
  display: 'flex',
  justifyContent: 'center',
  paddingLeft: theme.space.sm,
  paddingRight: theme.space.sm,
})

const Main = styled.main({
  padding: theme.space.sm,
})
