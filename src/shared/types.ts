/**
 * Type definitions for Email Reader View
 *
 * These types define the structure of profiles, settings, and storage data.
 */

export interface Profile {
  id: 'A' | 'B' | 'C'
  name: string
  backgroundColor: string
  textColor: string
  linkColor: string
}

export interface Settings {
  textAlign: 'start' | 'center' | 'justify'
  fontFamily: 'serif' | 'sans-serif' | 'monospace' | 'cursive'
  fontSize: number // 0.5 - 3 (rem)
  lineHeight: number // 1 - 2
  wordSpacing: number // 0 - 1 (em)
  letterSpacing: number // 0 - 0.3 (em)
  maxWidth: number // 20 - 70 (em)
  blockImages: boolean
}

export interface StorageData {
  profiles: Profile[]
  settings: Settings
  currentProfile: Profile['id']
  isEnabled: boolean
}

export interface ProviderConfig {
  hostname: string
  name: string
  selectors: string[]
}
