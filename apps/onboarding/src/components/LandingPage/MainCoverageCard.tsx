import styled from '@emotion/styled'
import Image from 'next/image'
import { Checkbox, Space, mq } from 'ui'
import { BodyText } from '@/components/BodyText'
import { BaseCardProps, Section, Wrapper } from './BaseCard'

const ImageFrame = styled.div({
  position: 'relative',
})

const MainWrapper = styled(Wrapper)({
  display: 'grid',
  gridTemplateColumns: '1fr 2fr',
  minHeight: '8rem',

  [mq.sm]: {
    borderRadius: '16px',
    gridTemplateColumns: '1fr',
    gridTemplateRows: '1.5fr 1fr',
  },
})

const CheckboxContainer = styled.div({
  padding: 0,
  position: 'static',
  marginLeft: 'auto',

  [mq.sm]: {
    position: 'absolute',
    top: 0,
    right: 0,
    zIndex: 30,
    padding: '0.625rem',
  },
})

export const MainCoverageCard = ({
  cardImg,
  blurDataURL,
  title,
  description,
  onCheck,
  imgAlt,
  selected,
  required,
  ...wrapperProps
}: BaseCardProps) => {
  const isCheckable = onCheck !== undefined
  return (
    <MainWrapper {...wrapperProps} selected={selected} isCheckable={isCheckable} onClick={onCheck}>
      <ImageFrame>
        <Image
          src={cardImg}
          alt={imgAlt}
          layout="fill"
          objectFit="cover"
          placeholder="blur"
          blurDataURL={blurDataURL}
          priority={true}
        />
      </ImageFrame>
      <Section isCheckable={isCheckable}>
        <Space y={0.25}>
          <BodyText variant={0} colorVariant="dark" displayBlock>
            {title}
          </BodyText>
          <BodyText variant={2} colorVariant="medium" displayBlock>
            {description}
          </BodyText>
        </Space>
        {isCheckable && (
          <CheckboxContainer>
            <Checkbox onChange={onCheck} checked={selected} required={required} />
          </CheckboxContainer>
        )}
      </Section>
    </MainWrapper>
  )
}
