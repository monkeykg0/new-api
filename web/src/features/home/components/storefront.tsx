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
import { Link, useNavigate } from '@tanstack/react-router'
import { ArrowRight, ArrowUpRight, BookOpen } from 'lucide-react'
import { useCallback, useMemo, useState } from 'react'
import { useTranslation } from 'react-i18next'

import { CopyButton } from '@/components/copy-button'
import { Button } from '@/components/ui/button'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { PricingTable } from '@/features/pricing/components/pricing-table'
import { usePricingData } from '@/features/pricing/hooks/use-pricing-data'
import {
  MODEL_CATEGORIES,
  filterByModelCategory,
  getModelCategoryLabel,
  type ModelCategory,
} from '@/features/pricing/model-categories'
import { useStatus } from '@/hooks/use-status'
import { getSiteApiBaseUrl, SITE_CANVAS_URL } from '@/lib/constants'
import { parseHeaderNavModulesFromStatus } from '@/lib/nav-modules'
import { useAuthStore } from '@/stores/auth-store'

export function Storefront() {
  const { t } = useTranslation()
  const { status } = useStatus()
  const isAuthenticated = useAuthStore((state) => Boolean(state.auth.user))
  const pricing = parseHeaderNavModulesFromStatus(status).pricing
  const showCatalog =
    Boolean(status) &&
    pricing.enabled &&
    (!pricing.requireAuth || isAuthenticated)
  const { models, vendors, isLoading, error, priceRate, usdExchangeRate } =
    usePricingData(showCatalog)
  const navigate = useNavigate()
  const [category, setCategory] = useState<ModelCategory>('text')
  const previewModels = useMemo(
    () => filterByModelCategory(models, category).slice(0, 5),
    [models, category]
  )
  const apiBaseUrl = getSiteApiBaseUrl(status?.server_address)
  const openModel = useCallback(
    (modelId: string) => {
      void navigate({
        to: '/pricing/$modelId',
        params: { modelId },
        search: {},
      })
    },
    [navigate]
  )

  return (
    <main className='mx-auto max-w-[76rem] px-5 pt-24 pb-14 sm:px-8 sm:pt-28'>
      <section className='grid items-center gap-9 border-b pb-10 lg:grid-cols-[0.85fr_1.15fr] lg:gap-14 lg:pb-12'>
        <div>
          <h1 className='font-display text-[clamp(2.5rem,5vw,4rem)] leading-[1.16] font-medium tracking-tight whitespace-pre-line'>
            {t('One API, from idea to creation')}
          </h1>
          <p className='text-muted-foreground mt-5 max-w-md text-sm leading-7 sm:text-base'>
            {t(
              'Browse models, compare prices, and use your API Key in Infinite Canvas.'
            )}
          </p>
          <div className='mt-7 flex flex-wrap gap-2.5'>
            <Button
              className='h-11 px-5'
              render={<Link to={isAuthenticated ? '/keys' : '/sign-in'} />}
            >
              {isAuthenticated ? t('API Keys') : t('Get started')}
              <ArrowRight data-icon='inline-end' />
            </Button>
            {SITE_CANVAS_URL && (
              <Button
                className='h-11 px-4'
                variant='outline'
                render={
                  <a
                    href={SITE_CANVAS_URL}
                    target='_blank'
                    rel='noopener noreferrer'
                  />
                }
              >
                {t('Open Infinite Canvas')}
                <ArrowUpRight data-icon='inline-end' />
              </Button>
            )}
            {pricing.enabled && (
              <Button
                className='h-11 px-4'
                variant='outline'
                render={<Link to='/pricing' search={{}} />}
              >
                {t('Browse models and pricing')}
              </Button>
            )}
          </div>
        </div>
        <figure className='bg-card overflow-hidden rounded-sm border shadow-xs'>
          <img
            src='/canvas-image-workbench.jpg'
            alt={t('Image workspace')}
            width={1280}
            height={720}
            className='aspect-video w-full object-cover'
            fetchPriority='high'
          />
          <figcaption className='text-muted-foreground border-t px-4 py-2.5 text-xs'>
            {t('Image workspace')}
          </figcaption>
        </figure>
      </section>

      <div className='flex flex-wrap items-center justify-between gap-3 border-b py-4 text-sm'>
        <div className='flex min-w-0 items-center gap-2'>
          <span className='text-muted-foreground shrink-0'>
            {t('API Base URL')}
          </span>
          <code className='font-medium [overflow-wrap:anywhere]'>
            {apiBaseUrl}
          </code>
          <CopyButton value={apiBaseUrl} />
        </div>
        {showCatalog && vendors.length > 0 && (
          <ul className='text-muted-foreground flex flex-wrap gap-x-4 gap-y-2 text-sm'>
            {vendors.slice(0, 6).map((vendor) => (
              <li key={vendor.id}>{vendor.name}</li>
            ))}
          </ul>
        )}
      </div>

      <section className='grid items-start gap-7 border-b py-10 sm:py-13 lg:grid-cols-[1.25fr_0.75fr] lg:gap-12'>
        <Tabs defaultValue='canvas' className='min-w-0 gap-3'>
          <TabsList variant='line' aria-label={t('Workspace previews')}>
            <TabsTrigger value='canvas'>{t('Infinite Canvas')}</TabsTrigger>
            <TabsTrigger value='image'>{t('Image workspace')}</TabsTrigger>
          </TabsList>
          <TabsContent value='canvas'>
            <img
              src='/canvas-workspace.jpg'
              alt={t('Infinite Canvas workspace preview')}
              className='bg-card aspect-video w-full rounded-sm border object-cover'
              width={1280}
              height={720}
              loading='lazy'
            />
          </TabsContent>
          <TabsContent value='image'>
            <img
              src='/canvas-image-workbench.jpg'
              alt={t('Image workspace')}
              className='bg-card aspect-video w-full rounded-sm border object-cover'
              width={1280}
              height={720}
              loading='lazy'
            />
          </TabsContent>
        </Tabs>
        <div className='lg:pt-8'>
          <h2 className='font-display text-3xl leading-tight font-medium sm:text-4xl'>
            {t('Create in Infinite Canvas')}
          </h2>
          <ol className='text-muted-foreground mt-5 list-decimal space-y-2.5 ps-5 text-sm leading-6'>
            <li>{t('Create an API Key in your console.')}</li>
            <li>
              {t(
                'Open the canvas and paste your Key into the imported connection.'
              )}
            </li>
            <li>
              {t('Load your available models and select one for your project.')}
            </li>
          </ol>
          <Button
            variant='link'
            className='mt-4 px-0'
            render={<Link to='/docs' hash='canvas' />}
          >
            <BookOpen data-icon='inline-start' />
            {t('Connection guide')}
          </Button>
        </div>
      </section>

      {showCatalog && (
        <section className='pt-10 sm:pt-13' aria-labelledby='storefront-models'>
          <div className='mb-3 flex flex-wrap items-end justify-between gap-3'>
            <h2
              id='storefront-models'
              className='font-display text-3xl font-medium sm:text-4xl'
            >
              {t('Model Square')}
            </h2>
            <Button
              variant='outline'
              render={<Link to='/pricing' search={{ category }} />}
            >
              {t('Browse models and pricing')}
              <ArrowRight data-icon='inline-end' />
            </Button>
          </div>
          <Tabs value={category} onValueChange={setCategory} className='gap-4'>
            <TabsList variant='line' aria-label={t('Model category')}>
              {MODEL_CATEGORIES.filter((item) => item !== 'all').map((item) => (
                <TabsTrigger key={item} value={item}>
                  {getModelCategoryLabel(item, t)}
                </TabsTrigger>
              ))}
            </TabsList>
            <TabsContent value={category}>
              {error ? (
                <p className='text-muted-foreground border-y py-4'>
                  {t('Could not load the model catalog.')}
                </p>
              ) : (
                <PricingTable
                  models={previewModels}
                  isLoading={isLoading}
                  priceRate={priceRate}
                  usdExchangeRate={usdExchangeRate}
                  onModelClick={openModel}
                  showPagination={false}
                />
              )}
            </TabsContent>
          </Tabs>
        </section>
      )}
    </main>
  )
}
