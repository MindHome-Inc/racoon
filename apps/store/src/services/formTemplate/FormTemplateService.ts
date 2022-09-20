import { JSONSchemaType } from 'ajv'
import { combineFormTemplate } from './combineFormTemplate'
import NO_ACCIDENT_SCHEMA from './data/NO_ACCIDENT.json'
import { NO_ACCIDENT_UI } from './data/NO_ACCIDENT_UI'
import NO_HOME_CONTENT_SCHEMA from './data/NO_HOME_CONTENT.json'
import { NO_HOME_CONTENT_UI } from './data/NO_HOME_CONTENT_UI'
import NO_HOUSE_SCHEMA from './data/NO_HOUSE.json'
import { NO_HOUSE_UI } from './data/NO_HOUSE_UI'
import NO_TRAVEL from './data/NO_TRAVEL.json'
import { NO_TRAVEL_UI } from './data/NO_TRAVEL_UI'
import SE_ACCIDENT_SCHEMA from './data/SE_ACCIDENT.json'
import { SE_ACCIDENT_UI } from './data/SE_ACCIDENT_UI'
import SWEDISH_APARTMENT_SCHEMA from './data/SWEDISH_APARTMENT.json'
import { SWEDISH_APARTMENT_UI } from './data/SWEDISH_APARTMENT_UI'
import { FormTemplate, FormTemplateUISchema } from './FormTemplate.types'

type Schema = JSONSchemaType<Record<string, unknown>>

const SCHEMA: Record<string, Schema> = {
  // TODO: investigate why we need explicit casting
  SWEDISH_APARTMENT: SWEDISH_APARTMENT_SCHEMA as unknown as Schema,
  SE_ACCIDENT: SE_ACCIDENT_SCHEMA as unknown as Schema,
  NO_HOME_CONTENT: NO_HOME_CONTENT_SCHEMA as unknown as Schema,
  NO_HOUSE: NO_HOUSE_SCHEMA as unknown as Schema,
  NO_TRAVEL: NO_TRAVEL as unknown as Schema,
  NO_ACCIDENT: NO_ACCIDENT_SCHEMA as unknown as Schema,
}
const UI_SCHEMA: Record<string, FormTemplateUISchema> = {
  SWEDISH_APARTMENT: SWEDISH_APARTMENT_UI,
  SE_ACCIDENT: SE_ACCIDENT_UI,
  NO_HOME_CONTENT: NO_HOME_CONTENT_UI,
  NO_HOUSE: NO_HOUSE_UI,
  NO_TRAVEL: NO_TRAVEL_UI,
  NO_ACCIDENT: NO_ACCIDENT_UI,
}

type FetchParams = {
  id: string
}

export class FormTemplateService {
  public async fetch({ id }: FetchParams): Promise<FormTemplate | null> {
    const schema = SCHEMA[id]
    const uiSchema = UI_SCHEMA[id]

    if (!schema || !uiSchema) return null

    return {
      id,
      ...combineFormTemplate({ schema, uiSchema }),
    }
  }
}
