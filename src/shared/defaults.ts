/**
 * Default values and constants for Email Reader View
 */

import type { Profile, Settings, StorageData, ProviderConfig } from './types'

export const DEFAULT_PROFILES: Profile[] = [
  {
    id: 'A',
    name: 'Light',
    backgroundColor: '#FFFDD0',
    textColor: '#202020',
    linkColor: '#3101ee',
  },
  {
    id: 'B',
    name: 'Dark',
    backgroundColor: '#202020',
    textColor: '#eeeeee',
    linkColor: '#8ab4f8',
  },
  {
    id: 'C',
    name: 'Sepia',
    backgroundColor: '#ffeedd',
    textColor: '#332211',
    linkColor: '#3101ee',
  },
]

export const DEFAULT_SETTINGS: Settings = {
  textAlign: 'start',
  fontFamily: 'sans-serif',
  fontSize: 1,
  lineHeight: 1.5,
  wordSpacing: 0.2,
  letterSpacing: 0.08,
  maxWidth: 40,
  blockImages: false,
}

export const DEFAULT_STORAGE: StorageData = {
  profiles: DEFAULT_PROFILES,
  settings: DEFAULT_SETTINGS,
  currentProfile: 'A',
  isEnabled: false,
}

/**
 * Email provider configurations
 *
 * Each provider has:
 * - hostname: The domain to match
 * - name: Display name
 * - selectors: CSS selectors to find the email body (tried in order)
 */
export const PROVIDERS: ProviderConfig[] = [
  {
    hostname: 'mail.google.com',
    name: 'Gmail',
    selectors: ['.a3s', 'table.message > tbody > tr > td > table > tbody > tr:last-of-type > td > div'],
  },
  {
    hostname: 'outlook.live.com',
    name: 'Outlook',
    selectors: ["[aria-label='Message body']"],
  },
  {
    hostname: 'mail.yahoo.com',
    name: 'Yahoo',
    selectors: ['.msg-body'],
  },
  {
    hostname: 'mail.aol.com',
    name: 'AOL',
    selectors: ['.AOLWebSuite > div[id]', '.msg-body'],
  },
]
