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
import { Link } from '@tanstack/react-router'
import { useTranslation } from 'react-i18next'

import { Skeleton } from '@/components/ui/skeleton'
import { useSystemConfig } from '@/hooks/use-system-config'

type AuthLayoutProps = {
  children: React.ReactNode
}

export function AuthLayout({ children }: AuthLayoutProps) {
  const { t } = useTranslation()
  const { systemName, logo, loading } = useSystemConfig()

  return (
    <div className='flex min-h-svh flex-col'>
      <header className='border-b'>
        <div className='mx-auto flex h-16 max-w-[74rem] items-center px-5 sm:px-8'>
          <Link
            to='/'
            aria-label={t('Go to home')}
            className='flex items-center gap-2.5 hover:opacity-80'
          >
            {loading ? (
              <Skeleton className='size-9' />
            ) : (
              <img src={logo} alt='' className='size-9 object-contain' />
            )}
            <span className='font-display text-xl font-semibold'>
              {systemName}
            </span>
          </Link>
        </div>
      </header>
      <main className='grid flex-1 place-items-center px-5 py-10 sm:py-16'>
        <div className='w-full max-w-md border-t pt-7 sm:pt-9'>{children}</div>
      </main>
    </div>
  )
}
