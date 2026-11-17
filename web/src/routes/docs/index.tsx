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
import { createFileRoute, Link } from '@tanstack/react-router'
import { useTranslation } from 'react-i18next'

import { CopyButton } from '@/components/copy-button'
import { PublicLayout } from '@/components/layout'
import { Button } from '@/components/ui/button'
import { useStatus } from '@/hooks/use-status'
import { getSiteApiBaseUrl, SITE_CANVAS_URL } from '@/lib/constants'

export const Route = createFileRoute('/docs/')({ component: ConnectionDocs })

function ConnectionDocs() {
  const { t } = useTranslation()
  const { status } = useStatus()
  const baseUrl = getSiteApiBaseUrl(status?.server_address)
  const modelRequest = [
    `curl ${baseUrl}/models`,
    '  -H "Authorization: Bearer YOUR_API_KEY"',
  ].join(' \\\n')
  const topics = [
    { id: 'account', title: t('API Keys') },
    { id: 'models', title: t('List models') },
    { id: 'canvas', title: t('Infinite Canvas') },
    { id: 'media', title: t('Image and video API') },
  ]

  return (
    <PublicLayout showMainContainer={false}>
      <main className='mx-auto grid max-w-[76rem] gap-9 px-5 pt-24 pb-16 sm:px-8 sm:pt-28 lg:grid-cols-[13rem_minmax(0,1fr)] lg:gap-14'>
        <aside className='lg:sticky lg:top-24 lg:self-start'>
          <nav
            aria-label={t('On this page')}
            className='border-b pb-5 lg:border-e lg:border-b-0 lg:pe-6'
          >
            <p className='text-muted-foreground mb-3 text-sm font-semibold'>
              {t('On this page')}
            </p>
            <ul className='flex flex-wrap gap-x-4 gap-y-2 text-sm lg:flex-col'>
              {topics.map((topic) => (
                <li key={topic.id}>
                  <a
                    className='hover:text-primary hover:underline'
                    href={`#${topic.id}`}
                  >
                    {topic.title}
                  </a>
                </li>
              ))}
            </ul>
          </nav>
        </aside>
        <article className='max-w-3xl min-w-0'>
          <h1 className='font-display text-4xl font-medium tracking-tight sm:text-5xl'>
            {t('Connection guide')}
          </h1>
          <div className='text-muted-foreground mt-5 flex flex-wrap items-center gap-2 text-sm'>
            <span>{t('API Base URL')}</span>
            <code className='text-foreground break-all'>{baseUrl}</code>
            <CopyButton value={baseUrl} />
          </div>

          <section id='account' className='mt-8 scroll-mt-24 border-t pt-7'>
            <h2 className='font-display text-2xl font-medium'>
              {t('API Keys')}
            </h2>
            <p className='text-muted-foreground mt-3 text-sm leading-6'>
              {t(
                'Create an API Key in your console. Send it as an Authorization Bearer header with each API request.'
              )}
            </p>
            <Button
              className='mt-4'
              variant='outline'
              render={<Link to='/keys' />}
            >
              {t('API Keys')}
            </Button>
          </section>

          <section id='models' className='mt-8 scroll-mt-24 border-t pt-7'>
            <h2 className='font-display text-2xl font-medium'>
              {t('List models')}
            </h2>
            <p className='text-muted-foreground mt-3 text-sm leading-6'>
              {t(
                'List the models your Key can access. For capabilities and prices, open the model catalog.'
              )}
            </p>
            <div className='bg-muted relative mt-4 rounded-sm border'>
              <CopyButton
                value={modelRequest}
                className='absolute end-2 top-2'
              />
              <pre className='overflow-x-auto p-4 pe-12 text-sm'>
                <code>{modelRequest}</code>
              </pre>
            </div>
            <Link
              to='/pricing'
              className='text-primary mt-4 inline-block text-sm underline underline-offset-4'
            >
              {t('Model Square')}
            </Link>
          </section>

          <section id='canvas' className='mt-8 scroll-mt-24 border-t pt-7'>
            <h2 className='font-display text-2xl font-medium'>
              {t('Infinite Canvas')}
            </h2>
            <ol className='text-muted-foreground mt-3 list-decimal space-y-2 ps-5 text-sm leading-6'>
              <li>{t('Create an API Key in your console.')}</li>
              <li>
                {t(
                  'Open the canvas and paste your Key into the imported connection.'
                )}
              </li>
              <li>
                {t(
                  'Load your available models and select one for your project.'
                )}
              </li>
            </ol>
            {SITE_CANVAS_URL && (
              <Button
                className='mt-4'
                render={
                  <a
                    href={SITE_CANVAS_URL}
                    target='_blank'
                    rel='noopener noreferrer'
                  />
                }
              >
                {t('Open Infinite Canvas')}
              </Button>
            )}
          </section>

          <section id='media' className='mt-8 scroll-mt-24 border-t pt-7'>
            <h2 className='font-display text-2xl font-medium'>
              {t('Image and video API')}
            </h2>
            <p className='text-muted-foreground mt-3 text-sm leading-6'>
              {t(
                'Check the model catalog for supported endpoints, prices, and currently available models.'
              )}
            </p>
            <dl className='mt-4 divide-y border-y text-sm'>
              <div className='grid gap-1 py-3 sm:grid-cols-[10rem_minmax(0,1fr)]'>
                <dt>{t('Image generation')}</dt>
                <dd>
                  <code>POST /v1/images/generations</code>
                </dd>
              </div>
              <div className='grid gap-1 py-3 sm:grid-cols-[10rem_minmax(0,1fr)]'>
                <dt>{t('Video generation')}</dt>
                <dd>
                  <code>POST /v1/videos</code>
                </dd>
              </div>
              <div className='grid gap-1 py-3 sm:grid-cols-[10rem_minmax(0,1fr)]'>
                <dt>{t('Video task status')}</dt>
                <dd>
                  <code>{'GET /v1/videos/{task_id}'}</code>
                </dd>
              </div>
            </dl>
          </section>
        </article>
      </main>
    </PublicLayout>
  )
}
