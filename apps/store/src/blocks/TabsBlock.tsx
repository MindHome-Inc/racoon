import { SbBlokData, StoryblokComponent, storyblokEditable } from '@storyblok/react'
import { useMemo } from 'react'
import * as Tabs from '@/components/ProductPage/Tabs'
import { SbBaseBlockProps } from '@/services/storyblok/storyblok'

type TabsBlockProps = SbBaseBlockProps<{
  items: Array<SbBlokData>
}>

type TabBlockFields = {
  title: string
  body: Array<SbBlokData>
}

type TabBlockData = SbBlokData & TabBlockFields

type TabBlockProps = SbBaseBlockProps<TabBlockFields>

export const TabsBlock = ({ blok }: TabsBlockProps) => {
  // TODO: Use storyblok-level filter to ensure all items are tabs instead of filtering here
  const tabBlocks = useMemo(() => blok.items.filter(isTabBlock), [blok.items])
  const firstTabValue = blok.items[0]?._uid

  return (
    <Tabs.Tabs defaultValue={firstTabValue} {...storyblokEditable(blok)}>
      <Tabs.TabsList>
        {tabBlocks.map((tabBlock) => {
          const tabId = tabBlock._uid || tabBlock.title
          return (
            <Tabs.TabsTrigger key={tabId} value={tabId}>
              {tabBlock.title}
            </Tabs.TabsTrigger>
          )
        })}
      </Tabs.TabsList>
      {tabBlocks.map((tabBlock) => (
        <TabBlock key={tabBlock._uid || tabBlock.title} blok={tabBlock} />
      ))}
    </Tabs.Tabs>
  )
}
TabsBlock.blockName = 'tabs'

const TabBlock = ({ blok }: TabBlockProps) => {
  return (
    <Tabs.TabsContent value={blok._uid || blok.title}>
      {blok.body.map((nestedBlock) => (
        <StoryblokComponent key={nestedBlock._uid} blok={nestedBlock} />
      ))}
    </Tabs.TabsContent>
  )
}

const isTabBlock = (blok: SbBlokData): blok is TabBlockData => {
  return blok.component === 'tab'
}
