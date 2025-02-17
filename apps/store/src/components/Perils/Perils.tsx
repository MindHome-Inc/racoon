import styled from '@emotion/styled'
import React, { useState, useCallback, ReactNode } from 'react'
import { mq, Text, theme } from 'ui'
import * as Accordion from '@/components/Accordion/Accordion'
import { PerilFragment } from '@/services/apollo/generated'
import { CoverageList } from './CoverageList'

const MAX_COLS = 4

type Props = {
  items: Array<PerilFragment>
}

export const Perils = ({ items }: Props) => {
  const numberOfItemsPerColumn = Math.ceil(items.length / MAX_COLS)
  const accordions: Array<ReactNode> = []
  for (let i = 0; i < items.length; i += numberOfItemsPerColumn) {
    const perils = items.slice(i, i + numberOfItemsPerColumn)
    accordions.push(<PerilsAccordion key={i} perils={perils} />)
  }

  return <PerilsAccordionGrid fixedCols={items.length < 4}>{accordions}</PerilsAccordionGrid>
}

const PerilsAccordionGrid = styled.div(({ fixedCols = false }: { fixedCols?: boolean }) => ({
  display: 'grid',
  gap: theme.space.xxs,

  [mq.md]: {
    gridTemplateColumns: `repeat(auto-fit, ${fixedCols ? '20.75rem' : 'minmax(20.75rem, 1fr)'})`,
    columnGap: theme.space.md,
  },
}))

const PerilsAccordion = ({ perils }: { perils: Array<PerilFragment> }) => {
  const [openedItems, setOpenedItems] = useState<Array<string>>()

  const handleValueChange = useCallback((value: Array<string>) => {
    setOpenedItems(value)
  }, [])

  return (
    <Accordion.Root type="multiple" value={openedItems} onValueChange={handleValueChange}>
      {perils.map(({ title, description, covered, colorCode }) => {
        return (
          <Accordion.Item key={title} value={title}>
            <Accordion.HeaderWithTrigger>
              <HeaderWrapper>
                <Color color={colorCode ?? titleToColor(title)} />
                <TriggerText size="lg">{title}</TriggerText>
              </HeaderWrapper>
            </Accordion.HeaderWithTrigger>
            <Accordion.Content>
              <ContentWrapper>
                <Text as="p" size="xs" color="textPrimary">
                  {description}
                </Text>
                <CoverageList items={covered} />
              </ContentWrapper>
            </Accordion.Content>
          </Accordion.Item>
        )
      })}
    </Accordion.Root>
  )
}

const ContentWrapper = styled.div({
  display: 'flex',
  flexDirection: 'column',
  gap: theme.space.md,
  paddingLeft: '1.75rem',
  paddingBlock: `${theme.space.md} ${theme.space.xxs}`,
  fontSize: theme.fontSizes.xs,

  [mq.lg]: {
    paddingTop: theme.space.lg,
    paddingBottom: theme.space.xs,
  },
})

const HeaderWrapper = styled.span({
  display: 'flex',
  alignItems: 'center',
  gap: theme.space.sm,
})

const TriggerText = styled(Text)({
  whiteSpace: 'nowrap',
  overflow: 'hidden',
  textOverflow: 'ellipsis',

  '[data-state=open] &': { whiteSpace: 'normal' },
})

const Color = styled.div<{ color?: string }>(({ color }) => ({
  width: '1rem',
  height: '1rem',
  borderRadius: '50%',
  backgroundColor: color,
}))

const titleToColor = (title: string) => {
  switch (title) {
    case 'Fire':
    case 'Eldsvåda':
      return theme.colors.red700
    case 'Water leaks':
    case 'Vattenläcka':
      return theme.colors.blue500
    case 'Storms':
    case 'Oväder':
      // TODO: double-check english title
      return theme.colors.blue700
    case 'Burglary':
    case 'Inbrott':
      return theme.colors.gray500
    case 'Theft and damage':
    case 'Stöld och skadegörelse':
      return theme.colors.gray700
    case 'Liability protection':
    case 'Ansvarsskydd':
      return theme.colors.yellow500
    case 'Legal protection':
    case 'Rättskydd':
      return theme.colors.yellow500
    case 'Travel insurance':
    case 'Resetrubbel':
      return theme.colors.amber600
    case 'Assault':
    case 'Överfall':
      return theme.colors.amber500
    case 'Travel illness':
    case 'Sjuk på resa':
      return theme.colors.teal500
    case 'White goods':
    case 'Vitvaror':
      return theme.colors.grayTranslucent25
    case 'All-risk':
    case 'Drulle':
      return theme.colors.yellow700
    case 'Criminal damage':
    case 'Skadegörelse':
      return theme.colors.gray700
    case 'Tenant ownership':
    case 'Bostadsrättstillägg':
      return theme.colors.green600
    case 'Care and treatment':
    case 'Vård & Behandling':
      return theme.colors.teal500
    case 'Dental injury':
    case 'Tandskada':
      return theme.colors.teal500
    case 'Hospitalisation':
    case 'Sjukhusvistelse':
      return theme.colors.teal700
    case 'Scarring':
    case 'Ärr':
      return theme.colors.yellow500
    case 'Crisis cover':
    case 'Krishjälp':
      return theme.colors.teal700
    case 'Permanent injury':
    case 'Bestående men':
      return theme.colors.purple500
    case 'Lost or reduced working capacity':
    case 'Förlorad arbetsförmåga':
      return theme.colors.purple500
    case 'Death':
    case 'Dödsfall':
      return theme.colors.purple700
    case 'Pests':
    case 'Skadedjur':
      return theme.colors.gray700
    case 'Rebuilding':
    case 'Ombyggnation':
      return theme.colors.pink700
    case 'Traffic insurance, personal injury':
    case 'Trafikförsäkring, personskador':
      return theme.colors.amber700
    case 'Traffic insurance, third-party property':
    case 'Trafikförsäkring, annans egendom':
      return theme.colors.yellow700
    case 'Theft & burglary':
    case 'Stöld & inbrott':
      return theme.colors.gray700
    case 'Brand':
      return theme.colors.red700
    case 'Glass damage':
    case 'Glas':
      return theme.colors.blue500
    case 'Roadside assistance':
    case 'Räddningshjälp och bärgning':
      return theme.colors.red600
    case 'Motor insurance':
    case 'Maskinskydd':
      return theme.colors.green600
    case 'Liability coverage':
    case 'Rättsskydd':
      return theme.colors.yellow500
    case 'Crisis counseling':
    case 'Kristerapi':
      return theme.colors.teal700
    case 'Car body damage':
    case 'Vagnskada':
      return theme.colors.green500
  }
}
