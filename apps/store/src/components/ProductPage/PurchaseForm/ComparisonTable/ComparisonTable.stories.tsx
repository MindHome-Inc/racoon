import { ComponentMeta } from '@storybook/react'
import * as ComparisonTable from './ComparisonTable'

export default {
  title: 'Product Page / Comparison Table',
  component: ComparisonTable.Root,
} as ComponentMeta<typeof ComparisonTable.Root>

export const Default = () => {
  return (
    <ComparisonTable.Root>
      <ComparisonTable.Head>
        <ComparisonTable.Header />
        <ComparisonTable.Header>Hel</ComparisonTable.Header>
        <ComparisonTable.Header active>Halv</ComparisonTable.Header>
        <ComparisonTable.Header>Trafik</ComparisonTable.Header>
      </ComparisonTable.Head>
      <ComparisonTable.Body>
        <ComparisonTable.Row>
          <ComparisonTable.TitleDataCell>Personskador</ComparisonTable.TitleDataCell>
          <ComparisonTable.DataCell>
            <ComparisonTable.CheckIcon />
          </ComparisonTable.DataCell>
          <ComparisonTable.DataCell active>
            <ComparisonTable.CheckIcon />
          </ComparisonTable.DataCell>
          <ComparisonTable.DataCell>
            <ComparisonTable.MissingIcon />
          </ComparisonTable.DataCell>
        </ComparisonTable.Row>
        <ComparisonTable.Row>
          <ComparisonTable.TitleDataCell>Andras skada</ComparisonTable.TitleDataCell>
          <ComparisonTable.DataCell>
            <ComparisonTable.CheckIcon />
          </ComparisonTable.DataCell>
          <ComparisonTable.DataCell active>
            <ComparisonTable.CheckIcon />
          </ComparisonTable.DataCell>
          <ComparisonTable.DataCell>
            <ComparisonTable.MissingIcon />
          </ComparisonTable.DataCell>
        </ComparisonTable.Row>
        <ComparisonTable.Row>
          <ComparisonTable.TitleDataCell>Stöld & inbrott</ComparisonTable.TitleDataCell>
          <ComparisonTable.DataCell>
            <ComparisonTable.CheckIcon />
          </ComparisonTable.DataCell>
          <ComparisonTable.DataCell active>
            <ComparisonTable.MissingIcon />
          </ComparisonTable.DataCell>
          <ComparisonTable.DataCell>
            <ComparisonTable.MissingIcon />
          </ComparisonTable.DataCell>
        </ComparisonTable.Row>
      </ComparisonTable.Body>
    </ComparisonTable.Root>
  )
}
Default.args = {}
