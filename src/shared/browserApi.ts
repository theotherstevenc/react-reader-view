/**
 * Cross-Browser Extension API Wrapper
 *
 * Provides a unified interface for browser extension APIs that works in:
 * - Chrome/Arc (chrome.* namespace)
 * - Firefox (browser.* namespace via polyfill)
 * - Dev environment (mocked APIs)
 *
 * The polyfill throws an error when loaded outside an extension environment,
 * so we detect the environment first and only use the polyfill in extensions.
 */

import { browserMock } from '../popup/chromeMock'

import type Browser from 'webextension-polyfill'

// Detect extension environment BEFORE importing polyfill
// This prevents the polyfill's error from being thrown
const isExtension = (() => {
  try {
    // Check for chrome.runtime.id which exists in extensions but not web pages
    return typeof chrome !== 'undefined' && !!chrome?.runtime?.id
  } catch {
    return false
  }
})()

// Conditionally import polyfill only in extension environment
let browserAPI: typeof Browser

if (isExtension) {
  // Safe to import in extension
  const polyfill = await import('webextension-polyfill')
  browserAPI = polyfill.default
} else {
  // Use mock in dev/browser
  browserAPI = browserMock as any
}

export const browser = browserAPI
