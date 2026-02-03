/**
 * Browser API Mock for Development
 *
 * Allows popup to run in regular browser for UI development.
 * Mocks webextension-polyfill APIs for testing.
 */

import { DEFAULT_PROFILES, DEFAULT_SETTINGS } from '@/shared/defaults'
import type { StorageData } from '@/shared/types'

let mockStorage: StorageData = {
  profiles: DEFAULT_PROFILES,
  settings: DEFAULT_SETTINGS,
  currentProfile: 'A',
  isEnabled: false,
}

export const browserMock = {
  storage: {
    sync: {
      get: (keys?: string[] | Record<string, unknown> | null): Promise<StorageData> => {
        console.log('🔧 [DEV] browser.storage.sync.get', keys)
        // Browser storage.get() with an object uses it as defaults
        if (keys && typeof keys === 'object' && !Array.isArray(keys)) {
          return Promise.resolve({ ...keys, ...mockStorage } as StorageData)
        }
        return Promise.resolve(mockStorage)
      },
      set: (data: Partial<StorageData>): Promise<void> => {
        console.log('🔧 [DEV] browser.storage.sync.set', data)
        mockStorage = { ...mockStorage, ...data }
        return Promise.resolve()
      },
      clear: (): Promise<void> => {
        console.log('🔧 [DEV] browser.storage.sync.clear')
        mockStorage = {
          profiles: DEFAULT_PROFILES,
          settings: DEFAULT_SETTINGS,
          currentProfile: 'A',
          isEnabled: false,
        }
        return Promise.resolve()
      },
    },
  },
  tabs: {
    query: (): Promise<{ id?: number }[]> => {
      console.log('🔧 [DEV] browser.tabs.query')
      return Promise.resolve([{ id: 123 }])
    },
  },
  scripting: {
    executeScript: (injection: unknown): Promise<void> => {
      console.log('🔧 [DEV] browser.scripting.executeScript', injection)
      return Promise.resolve()
    },
  },
}

export function initBrowserMock() {
  // Mock both chrome and browser for dev environment
  if (typeof chrome === 'undefined' || !chrome.storage) {
    console.log('🔧 [DEV MODE] Injecting Browser API mocks')
    // @ts-expect-error - Mock for dev
    window.chrome = browserMock
    // @ts-expect-error - Mock for dev
    window.browser = browserMock
  }
}
