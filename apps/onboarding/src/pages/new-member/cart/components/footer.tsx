import { LinkButton, mq } from 'ui'
import { MonthlyPrice, PriceProps } from './monthly-price'

import React from 'react'
import styled from '@emotion/styled'
import { useTranslation } from 'next-i18next'

export type FooterProps = {
  buttonText: string
  buttonLinkTo: string
} & PriceProps

const Wrapper = styled.div({
  marginTop: '1.5rem',
  width: '100vw',
  minHeight: '5rem',
  padding: '1rem',
  position: 'sticky',
  bottom: 0,
  left: 0,
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  backgroundColor: 'white',
  boxShadow: '0px -4px 8px rgba(0, 0, 0, 0.05), 0px -8px 16px rgba(0, 0, 0, 0.05)',

  [mq.lg]: {
    width: '50vw',
  },
})

const InnerWrapper = styled.div({
  width: '100%',
  height: '100%',
  maxWidth: '628px',
  display: 'grid',
  gridTemplateColumns: 'max-content 1fr',
  gap: '1rem',
  alignItems: 'center',

  [mq.lg]: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    maxWidth: '600px',
    padding: '0 2rem',
  }  
})

const PriceWrapper = styled.div({})

const PriceLabel = styled.p(({ theme }) => ({
  fontSize: '0.75rem',
  lineHeight: '1rem',
  color: theme.colors.gray700,
  margin: 0,
}))

export const Footer = ({ buttonText, buttonLinkTo, price }: FooterProps) => {
  const { t } = useTranslation()
  return (
    <Wrapper>
      <InnerWrapper>
        <PriceWrapper>
          <MonthlyPrice price={price} />
          <PriceLabel>{t('CANCEL_ANYTIME')}</PriceLabel>
        </PriceWrapper>
        <LinkButton $color="lavender" href={buttonLinkTo}>
          {buttonText}
        </LinkButton>
      </InnerWrapper>
    </Wrapper>
  )
}
