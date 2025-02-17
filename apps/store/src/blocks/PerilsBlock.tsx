import styled from '@emotion/styled'
import { storyblokEditable } from '@storyblok/react'
import { useMemo } from 'react'
import { HeadingLabel, Space, theme } from 'ui'
import { Perils } from '@/components/Perils/Perils'
import { useProductPageContext } from '@/components/ProductPage/ProductPageContext'
import { SbBaseBlockProps } from '@/services/storyblok/storyblok'

type PerilsBlockProps = SbBaseBlockProps<{
  heading?: string
}>

export const PerilsBlock = ({ blok }: PerilsBlockProps) => {
  const { productData, selectedVariant } = useProductPageContext()

  const items = useMemo(() => {
    const selectedProductVariant = productData.variants.find(
      (item) => item.typeOfContract === selectedVariant?.typeOfContract,
    )

    const productVariant = selectedProductVariant ?? productData.variants[0]

    return productVariant.perils.map((item) => ({
      id: item.title,
      ...item,
    }))
  }, [productData, selectedVariant])

  return (
    <Wrapper {...storyblokEditable(blok)}>
      <Space y={1}>
        {blok.heading && <HeadingLabel>{blok.heading}</HeadingLabel>}
        <Perils items={items} />
      </Space>
    </Wrapper>
  )
}

PerilsBlock.blockName = 'perils'

const Wrapper = styled.div({
  paddingInline: theme.space.md,
})
