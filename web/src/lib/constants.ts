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
/**
 * Application-wide constants
 */

// System Configuration Defaults
export const DEFAULT_SYSTEM_NAME = 'New API'
export const DEFAULT_LOGO = '/logo.png'
export const DEFAULT_FAVICON = '/favicon.ico'

export const SITE_NAME = 'musketeer'
export const SITE_CANVAS_URL = import.meta.env.VITE_REACT_APP_CANVAS_URL?.trim()

export function getSiteName(name?: string) {
  return !name || name === DEFAULT_SYSTEM_NAME ? SITE_NAME : name
}

export function getSiteLogo(logo?: string) {
  return logo || DEFAULT_LOGO
}

export function getSiteFavicon(logo?: string) {
  return !logo || logo === DEFAULT_LOGO ? DEFAULT_FAVICON : logo
}

export function getSiteApiBaseUrl(address: unknown) {
  const origin = typeof window === 'undefined' ? '' : window.location.origin
  const base =
    typeof address === 'string' && address.trim() ? address.trim() : origin
  return `${base.replace(/\/+$/, '').replace(/\/v1$/, '')}/v1`
}

// LocalStorage Keys
export const STORAGE_KEYS = {
  SYSTEM_NAME: 'system_name',
  LOGO: 'logo',
  FOOTER_HTML: 'footer_html',
} as const
