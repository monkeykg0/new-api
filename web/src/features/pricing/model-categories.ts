/*
Copyright (C) 2023-2026 QuantumNous

This program is free software: you can redistribute it and/or modify
it under the terms of the GNU Affero General Public License as
published by the Free Software Foundation, either version 3 of the
License, or (at your option) any later version.

This program is distributed in the hope that it will be useful,
but WITHOUT ANY WARRANTY; without even the implied warranty of
MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the
GNU Affero General Public License for more details.

You should have received a copy of the GNU Affero General Public License
along with this program. If not, see <https://www.gnu.org/licenses/>.

For commercial licensing, please contact support@quantumnous.com
*/
import type { TFunction } from 'i18next'

import { ENDPOINT_TYPES } from './constants'
import type { PricingModel } from './types'

export const MODEL_CATEGORIES = [
  'all',
  'text',
  'image',
  'video',
  'embedding',
] as const
export type ModelCategory = (typeof MODEL_CATEGORIES)[number]

const CATEGORY_ENDPOINTS: Record<
  Exclude<ModelCategory, 'all'>,
  readonly string[]
> = {
  text: [
    ENDPOINT_TYPES.OPENAI,
    ENDPOINT_TYPES.OPENAI_RESPONSE,
    ENDPOINT_TYPES.ANTHROPIC,
    ENDPOINT_TYPES.GEMINI,
  ],
  image: [ENDPOINT_TYPES.IMAGE_GENERATION],
  video: [ENDPOINT_TYPES.OPENAI_VIDEO],
  embedding: [ENDPOINT_TYPES.EMBEDDINGS],
}

export function getModelCategoryLabel(category: ModelCategory, t: TFunction) {
  return {
    all: t('All'),
    text: t('Text'),
    image: t('Image'),
    video: t('Video'),
    embedding: t('Embeddings'),
  }[category]
}

export function filterByModelCategory(
  models: PricingModel[],
  category: ModelCategory
) {
  if (category === 'all') return models
  return models.filter((model) =>
    model.supported_endpoint_types?.some((endpoint) =>
      CATEGORY_ENDPOINTS[category].includes(endpoint)
    )
  )
}
