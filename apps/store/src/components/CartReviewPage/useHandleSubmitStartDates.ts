import { FormEventHandler } from 'react'
import { useStartDateUpdateMutation } from '@/services/apollo/generated'
import { CartReviewPageProps } from './CartReviewPage.types'

type Params = {
  products: CartReviewPageProps['products']
  onSuccess: () => void
}

export const useHandleSubmitStartDates = ({ products, onSuccess }: Params) => {
  const [updateStartDate, result] = useStartDateUpdateMutation()

  const handleSubmit: FormEventHandler<HTMLFormElement> = async (event) => {
    event.preventDefault()

    const inputs = products.map((product) => {
      const inputElement = event.currentTarget.elements.namedItem(product.lineId)

      if (!isDateInputElement(inputElement)) {
        console.log('Unable to update start dates')
        console.log('Input element', inputElement)
        console.log('All elements', event.currentTarget.elements)
        throw new Error(`No date input for ${product.lineId}`)
      }

      const startDate = inputElement.valueAsDate?.toISOString().substring(0, 10) ?? null

      return {
        lineItemId: product.lineId,
        startDate,
      }
    })

    await Promise.all(inputs.map((variables) => updateStartDate({ variables })))
    onSuccess()
  }

  return [handleSubmit, result] as const
}

const isDateInputElement = (value: unknown): value is HTMLInputElement => {
  return typeof value === 'object' && value !== null && 'valueAsDate' in value
}
