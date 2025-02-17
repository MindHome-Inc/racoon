import { ComponentMeta, ComponentStory } from '@storybook/react'
import { useState } from 'react'
import { CurrencyCode, ExternalInsuranceCancellationOption } from '@/services/apollo/generated'
import { TierSelector, TierSelectorProps } from './TierSelector'

export default {
  title: 'Tier Selector',
  component: TierSelector,
} as ComponentMeta<typeof TierSelector>

const Template: ComponentStory<typeof TierSelector> = (props) => {
  const [selected, setSelected] = useState('')
  return <TierSelector {...props} onValueChange={setSelected} selectedOfferId={selected} />
}

const MockedOffers: TierSelectorProps['offers'] = [
  {
    id: '0',
    variant: {
      typeOfContract: 'SE_CAR_TRAFFIC',
      displayName: 'Traffic',
      product: {
        name: 'SE_CAR',
        displayNameFull: 'Bilförsäkring',
        pillowImage: {
          id: '6646216',
          alt: '',
          src: 'https://a.storyblok.com/f/165473/512x512/7996914970/se-apartment-rental.png',
        },
      },
      documents: [],
      perils: [],
    },
    price: { amount: 199, currencyCode: CurrencyCode.Sek, __typename: 'Money' },
    cancellation: {
      option: ExternalInsuranceCancellationOption.None,
      requested: false,
    },
    priceIntentData: {},
  },
  {
    id: '1',
    variant: {
      typeOfContract: 'SE_CAR_HALF',
      displayName: 'Halvförsäkring',
      product: {
        name: 'SE_CAR',
        displayNameFull: 'Bilförsäkring',
        pillowImage: {
          id: '6646216',
          alt: '',
          src: 'https://a.storyblok.com/f/165473/512x512/7996914970/se-apartment-rental.png',
        },
      },
      documents: [],
      perils: [],
    },
    price: { amount: 399, currencyCode: CurrencyCode.Sek, __typename: 'Money' },
    cancellation: {
      option: ExternalInsuranceCancellationOption.None,
      requested: false,
    },
    priceIntentData: {},
  },
  {
    id: '2',
    variant: {
      typeOfContract: 'SE_CAR_FULL',
      displayName: 'Driving',
      product: {
        name: 'SE_CAR',
        displayNameFull: 'Bilförsäkring',
        pillowImage: {
          id: '6646216',
          alt: '',
          src: 'https://a.storyblok.com/f/165473/512x512/7996914970/se-apartment-rental.png',
        },
      },
      documents: [],
      perils: [],
    },
    price: { amount: 999, currencyCode: CurrencyCode.Sek, __typename: 'Money' },
    cancellation: {
      option: ExternalInsuranceCancellationOption.None,
      requested: false,
    },
    priceIntentData: {},
  },
]

export const Default = Template.bind({})
Default.args = {
  offers: MockedOffers,
  currencyCode: 'SEK',
}
