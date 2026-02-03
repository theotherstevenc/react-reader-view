/**
 * Chrome API Mock for Development
 *
 * Allows popup to run in regular browser for UI development
 */

import { DEFAULT_PROFILES, DEFAULT_SETTINGS } from '@/shared/defaults'
import type { StorageData } from '@/shared/types'

let mockStorage: StorageData = {
  profiles: DEFAULT_PROFILES,
  settings: DEFAULT_SETTINGS,
  currentProfile: 'A',
  isEnabled: false,
}

export const chromeMock = {
  storage: {
    sync: {
      get: (keys?: string[] | Record<string, unknown> | null): Promise<StorageData> => {
        console.log('🔧 [DEV] chrome.storage.sync.get', keys)
        // Chrome storage.get() with an object uses it as defaults
        if (keys && typeof keys === 'object' && !Array.isArray(keys)) {
          return Promise.resolve({ ...keys, ...mockStorage } as StorageData)
        }
        return Promise.resolve(mockStorage)
      },
      set: (data: Partial<StorageData>): Promise<void> => {
        console.log('🔧 [DEV] chrome.storage.sync.set', data)
        mockStorage = { ...mockStorage, ...data }
        return Promise.resolve()
      },
    },
  },
  tabs: {
    query: (): Promise<{ id?: number }[]> => {
      console.log('🔧 [DEV] chrome.tabs.query')
      return Promise.resolve([{ id: 123 }])
    },
  },
  scripting: {
    executeScript: (injection: unknown): Promise<void> => {
      console.log('🔧 [DEV] chrome.scripting.executeScript', injection)
      return Promise.resolve()
    },
  },
}

export function initChromeMock() {
  if (typeof chrome === 'undefined' || !chrome.storage) {
    console.log('🔧 [DEV MODE] Injecting Chrome API mocks')
    // @ts-expect-error - Mock for dev
    window.chrome = chromeMock
  }
}
