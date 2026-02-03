/**
 * Chrome Storage API Helpers
 *
 * Type-safe wrappers around Chrome Storage Sync API.
 * Replaces localStorage from legacy implementation with cloud-synced storage.
 *
 * Chrome Storage Sync benefits:
 * - Settings sync across devices (if user is signed into Chrome)
 * - Works in extension context (popup, content scripts, background)
 * - Automatic serialization/deserialization
 */

import { DEFAULT_STORAGE } from './defaults'

import type { StorageData } from './types'

/**
 * Get all storage data
 * Returns default values for any missing keys
 */
export async function getStorage(): Promise<StorageData> {
  const result = await chrome.storage.sync.get(DEFAULT_STORAGE)
  return result as StorageData
}

/**
 * Update storage with partial data
 * Only updates the keys provided
 */
export async function setStorage(data: Partial<StorageData>): Promise<void> {
  await chrome.storage.sync.set(data)
}

/**
 * Reset storage to defaults
 * Clears all data and sets default values
 */
export async function resetStorage(): Promise<void> {
  await chrome.storage.sync.clear()
  await chrome.storage.sync.set(DEFAULT_STORAGE)
}

/**
 * Type-safe helper to update profiles
 */
export async function updateProfiles(profiles: StorageData['profiles']): Promise<void> {
  await setStorage({ profiles })
}

/**
 * Type-safe helper to update settings
 */
export async function updateSettings(settings: StorageData['settings']): Promise<void> {
  await setStorage({ settings })
}

/**
 * Type-safe helper to update current profile
 */
export async function updateCurrentProfile(currentProfile: StorageData['currentProfile']): Promise<void> {
  await setStorage({ currentProfile })
}

/**
 * Type-safe helper to update enabled state
 */
export async function updateEnabled(isEnabled: boolean): Promise<void> {
  await setStorage({ isEnabled })
}
