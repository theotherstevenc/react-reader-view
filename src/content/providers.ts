/**
 * Email Provider Detection
 *
 * Finds the email body container for different email providers.
 * Each provider has different DOM structures, so we try multiple selectors.
 *
 * Reference: legacy/src/utils/enableReaderView.js lines 104-125
 */

import { PROVIDERS } from '@/shared/defaults'

/**
 * Find the email body container on the current page
 *
 * @returns HTMLElement if found, null if:
 *   - Not on a supported email provider
 *   - Email container not found (selectors outdated)
 */
export function getEmailContainer(): HTMLElement | null {
  // Find provider config for current hostname
  const provider = PROVIDERS.find((p) => p.hostname === window.location.hostname)

  if (!provider) {
    console.warn('Email Reader View: Unsupported email provider')
    return null
  }

  // Try each selector until we find the email body
  for (const selector of provider.selectors) {
    const element = document.querySelector(selector)
    if (element) {
      // Success - return the found container
      return element as HTMLElement
    }
  }

  console.warn('Email Reader View: Could not find email container')
  return null
}
