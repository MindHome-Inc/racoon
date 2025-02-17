import styled from '@emotion/styled'
import { useTranslation } from 'next-i18next'
import { Heading, mq, Space, theme } from 'ui'
import { ImageSize } from '@/blocks/ProductCardBlock'
import { ProductRecommendationFragment } from '@/services/apollo/generated'
import { getStoryblokImageSize } from '@/services/storyblok/Storyblok.helpers'
import { ProductCard } from '../ProductCard/ProductCard'

type Props = {
  recommendations: Array<ProductRecommendationFragment>
}

export const RecommendationList = ({ recommendations }: Props) => {
  const { t } = useTranslation('cart')

  return (
    <Wrapper y={1.5}>
      <MobileHeader>
        <Heading as="h2" variant="standard.24">
          {t('RECOMMENDATIONS_HEADING')}
        </Heading>
      </MobileHeader>
      <DesktopHeader>
        <Heading as="h2" variant="standard.32">
          {t('RECOMMENDATIONS_HEADING')}
        </Heading>
      </DesktopHeader>

      <List>
        {recommendations.map((item) => (
          <FeaturedProduct key={item.id} recommendation={item} />
        ))}
      </List>
    </Wrapper>
  )
}

const FALLBACK_IMAGE = 'https://a.storyblok.com/f/165473/330x396/573a75c77d/home-low.png'

type FeaturedProductProps = {
  recommendation: ProductRecommendationFragment
}

const FeaturedProduct = ({ recommendation }: FeaturedProductProps) => {
  const imageSrc = recommendation.featuredImage?.src ?? FALLBACK_IMAGE
  const imageSize = getStoryblokImageSize(imageSrc)
  const aspectRatio = imageSize ? calculateAspectRatio(imageSize) : undefined

  return (
    <ProductCard
      key={recommendation.id}
      title={recommendation.displayNameShort}
      subtitle={recommendation.displayNameFull}
      image={{ src: imageSrc, alt: recommendation.featuredImage?.alt ?? '' }}
      aspectRatio={aspectRatio}
      link={recommendation.pageLink}
    />
  )
}

type CalculateAspectRatioParams = {
  width: number
  height: number
}

const calculateAspectRatio = ({
  width,
  height,
}: CalculateAspectRatioParams): ImageSize['aspectRatio'] => {
  // TODO: properly evaluate aspect ratio
  return `${width} / ${height}` as ImageSize['aspectRatio']
}

const Wrapper = styled(Space)({
  paddingInline: theme.space.md,

  [mq.sm]: {
    display: 'grid',
    gridTemplateColumns: 'minmax(28rem, 33%)',
    justifyContent: 'center',
  },

  [mq.lg]: { display: 'block' },
})

const MobileHeader = styled.div({
  paddingInline: theme.space.xs,

  [mq.lg]: {
    display: 'none',
  },
})

const DesktopHeader = styled.div({
  display: 'none',

  [mq.lg]: {
    display: 'flex',
    justifyContent: 'center',
  },
})

// TODO: reuse styles as product grid
const List = styled.div({
  display: 'grid',
  gap: `${theme.space.xxxl} ${theme.space.xs}`,
  alignItems: 'baseline',
  gridTemplateColumns: `repeat(auto-fit, minmax(20rem, 1fr))`,

  [mq.md]: {
    gap: '2rem 1rem',
  },
})
