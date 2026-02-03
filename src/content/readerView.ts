/**
 * Reader View Transformation Logic
 *
 * Core functionality to transform email content into readable format.
 * Applies custom styling, strips inline styles, and processes special elements.
 *
 * Reference: legacy/src/utils/enableReaderView.js (214 lines)
 * Reference: legacy/src/utils/disableReaderView.js (41 lines)
 */

import { getEmailContainer } from './providers'

import type { Profile, Settings } from '@/shared/types'

/**
 * Enable reader view on the current email
 *
 * @param profiles - Array of 3 color profiles
 * @param settings - Typography and display settings
 * @param currentProfileId - Which profile to apply (A, B, or C)
 */
export function enableReaderView(profiles: Profile[], settings: Settings, currentProfileId: Profile['id']): void {
  const container = getEmailContainer()
  if (!container) {
    alert('Email Reader View: Could not find email content on this page')
    return
  }

  // Check for AMP email (iframe-based, not supported)
  const iframe = container.querySelector('iframe')
  if (iframe) {
    alert('Reader view does not yet support AMP email')
    return
  }

  // Find current profile
  const currentProfile = profiles.find((p) => p.id === currentProfileId)
  if (!currentProfile) return

  // Apply reader view class and attribute
  container.classList.add('readerView')
  container.setAttribute('data-readerViewProfile', currentProfileId)

  // Inject or update styles
  injectStyles(profiles, settings)

  // Process all elements
  processElements(container, settings)
}

/**
 * Inject CSS styles into the page
 * Creates or updates a <style> element in <head>
 */
function injectStyles(profiles: Profile[], settings: Settings): void {
  const styleId = 'ervStyleElement'
  let styleElement = document.getElementById(styleId) as HTMLStyleElement

  if (!styleElement) {
    styleElement = document.createElement('style')
    styleElement.id = styleId
    document.head.appendChild(styleElement)
  }

  styleElement.textContent = generateCSS(profiles, settings)
}

/**
 * Generate CSS stylesheet
 *
 * IMPORTANT: This CSS is complex and must remain EXACT.
 * It handles table detection, style resets, and profile colors.
 *
 * Reference: legacy/src/utils/enableReaderView.js lines 4-98
 */
function generateCSS(profiles: Profile[], settings: Settings): string {
  // Note: profile[0].color changed to profile[0].textColor in our types
  return `
    .readerView.readerView * {
      all: revert
    }
    .readerView.readerView [data-hidden]{
      display:none !important
    }
    .readerView.readerView img{max-width:100%}
    .readerView.readerView table {display:block;}
    .readerView.readerView table:not([role="table"]):not([role="grid"]) :where(tbody, thead, tfoot, th, td){
      display:contents;
      font-weight:unset;
    }
    .readerView.readerView table:not([role="table"]):not([role="grid"]) > * > tr{
      display:block;
      margin:1em 0;
    }
    .readerView.readerView table:not([role="presentation"]):not([role="none"]):is(
      :has(>thead ~ tbody),
      :has(>tbody ~ tfoot),
      :has(>tbody>tr>th[scope]),
      :has(>tbody>tr>th+td):has(>tbody>tr+tr),
      :has(>tbody>tr>th):has(>tbody>tr>td + td)
    ),
    .readerView.readerView table:not([role="presentation"]):not([role="none"]):is(
      :has(>thead ~ tbody),
      :has(>tbody ~ tfoot),
      :has(>tbody>tr>th[scope]),
      :has(>tbody>tr>th+td):has(>tbody>tr+tr),
      :has(>tbody>tr>th):has(>tbody>tr>td + td)
    ) :where(tbody, thead, tfoot, tbody > tr, thead > tr, tfoot > tr,  tbody > tr > td,  tbody > tr > th,   thead > tr > th, thead > tr > td, tfoot > tr > th, tfoot > tr > td){
      display:revert;
      width:revert;
      border:1px solid;
      border-spacing:.2em;
      padding:.2em;
      word-break: normal;
      font-weight:revert;
    }
    .readerView.readerView thead::after,
    .readerView.readerView tfoot::before{
      content:'';
      display:block;
      height:.4em;
    }
    .readerView.readerView .blockedImage:not(:empty){
      border: 1px dashed;
      padding: 1em;
      display:inline-block;
      overflow-wrap: anywhere;
    }
    .readerView.readerView .blockedImage + img {
        display: none;
    }
    .readerView[data-readerviewprofile="A"]{
      background:${profiles[0].backgroundColor};
      color: ${profiles[0].textColor};
    }
    .readerView[data-readerviewprofile="A"] :is(a, a *) {
        text-decoration: underline;
        color:${profiles[0].linkColor};
    }
    .readerView[data-readerviewprofile="B"]{
      background:${profiles[1].backgroundColor};
      color: ${profiles[1].textColor};
    }
    .readerView[data-readerviewprofile="B"] :is(a, a *) {
        text-decoration: underline;
        color:${profiles[1].linkColor};
    }
    .readerView[data-readerviewprofile="C"]{
      background:${profiles[2].backgroundColor};
      color: ${profiles[2].textColor};
    }
    .readerView[data-readerviewprofile="C"] :is(a, a *) {
        text-decoration: underline;
        color:${profiles[2].linkColor};
    }
    .readerView.readerView {
      text-align:${settings.textAlign};
      font-family:${settings.fontFamily};
      font-size:${settings.fontSize}rem;
      line-height:${settings.lineHeight};
      word-spacing:${settings.wordSpacing}em;
      letter-spacing:${settings.letterSpacing}em;
      max-width: ${settings.maxWidth}em;
      margin: 0 auto;
      overflow: auto; /* For when things can't collapse far enough */
      padding: 1em !important; /* override yahoo */
    }
    .readerView.readerView *{
      text-align:${settings.textAlign};
    }
  .readerView.readerView button{display:none} /* Outlook zoom button */
  `
}

/**
 * Process all elements in the email container
 *
 * Iterates through every element and:
 * - Hides already-hidden elements
 * - Handles emoji images
 * - Blocks images if enabled
 * - Fixes empty links
 * - Strips styling attributes
 *
 * Reference: legacy/src/utils/enableReaderView.js lines 145-212
 */
function processElements(container: HTMLElement, settings: Settings): void {
  // Remove old blocked images from previous runs
  const oldBlockedImages = document.querySelectorAll('.blockedImage')
  oldBlockedImages.forEach((img) => img.remove())

  // Get all elements in the email
  const elements = Array.from(container.querySelectorAll('*'))

  for (const element of elements) {
    const htmlElement = element as HTMLElement
    const computedStyle = window.getComputedStyle(htmlElement)

    // Hide elements that are already hidden
    if (computedStyle.display === 'none') {
      htmlElement.setAttribute('data-hidden', '')
    }

    if (htmlElement.getAttribute('aria-hidden') === 'true') {
      htmlElement.setAttribute('data-hidden', '')
    }

    // Handle emoji images
    handleEmojis(htmlElement, settings)

    // Block images if enabled
    if (settings.blockImages) {
      handleImageBlocking(htmlElement)
    }

    // Fix empty links (add href as text content)
    if (htmlElement.tagName === 'A' && htmlElement.innerHTML.trim() === '') {
      const href = htmlElement.getAttribute('href')
      if (href) htmlElement.textContent = href
    }

    // Clean up empty nbsp
    if (htmlElement.innerHTML.trim() === '&nbsp;') {
      htmlElement.innerHTML = ''
    }

    // Strip styling attributes (but save them for restoration)
    stripAttributes(htmlElement)
  }
}

/**
 * Handle emoji images
 *
 * Converts emoji images to text using alt attribute
 *
 * Reference: legacy/src/utils/enableReaderView.js lines 157-165
 */
function handleEmojis(element: HTMLElement, settings: Settings): void {
  // Remove emoji replacements from previous runs
  if (element.hasAttribute('data-erv-emoji')) {
    element.remove()
    return
  }

  // Convert emoji images to text (if not blocking images)
  if (element.hasAttribute('data-emoji') && !settings.blockImages) {
    const alt = element.getAttribute('alt') || ''
    element.insertAdjacentHTML('beforebegin', `<span data-erv-emoji>${alt}</span>`)
    element.setAttribute('data-hidden', '')
  }
}

/**
 * Handle image blocking
 *
 * Replaces images with their alt text for privacy/data savings
 *
 * Reference: legacy/src/utils/enableReaderView.js lines 167-184
 */
function handleImageBlocking(element: HTMLElement): void {
  if (element.tagName !== 'IMG' || element.hasAttribute('hidden')) return

  let alt = element.getAttribute('alt') || ''

  // Special case: Image is only child of a link
  const parent = element.parentElement
  if (parent?.tagName === 'A' && parent.children.length === 1 && parent.textContent?.trim() === '') {
    // If no alt text, use the link href instead
    if (alt === '') {
      alt = parent.getAttribute('href') || ''
    }
  }

  // Create placeholder span with alt text
  const placeholder = document.createElement('span')
  placeholder.textContent = alt.trim()
  placeholder.classList.add('blockedImage')
  element.insertAdjacentElement('beforebegin', placeholder)
}

/**
 * Strip styling attributes from an element
 *
 * Removes style, class, id, and other presentation attributes.
 * Saves them as data-removed* attributes so they can be restored.
 *
 * Reference: legacy/src/utils/enableReaderView.js lines 195-212
 */
function stripAttributes(element: HTMLElement): void {
  const attributesToStrip = ['style', 'class', 'id', 'align', 'color', 'background', 'bgcolor', 'width', 'height']

  for (const attr of attributesToStrip) {
    if (element.hasAttribute(attr)) {
      const value = element.getAttribute(attr)
      element.setAttribute(`data-removed${attr}`, value || '')
      element.removeAttribute(attr)
    }
  }
}

/**
 * Disable reader view
 *
 * Reverses all transformations:
 * - Restores original attributes
 * - Removes reader view classes
 * - Removes injected styles
 *
 * Reference: legacy/src/utils/disableReaderView.js (entire file - 41 lines)
 */
export function disableReaderView(): void {
  const containers = document.querySelectorAll('.readerView')

  for (const container of Array.from(containers)) {
    const elements = container.querySelectorAll('*')

    for (const element of Array.from(elements)) {
      const htmlElement = element as HTMLElement

      // Restore stripped attributes
      restoreAttributes(htmlElement)

      // Remove data-hidden
      htmlElement.removeAttribute('data-hidden')

      // Remove emoji replacements
      if (htmlElement.hasAttribute('data-erv-emoji')) {
        htmlElement.remove()
      }
    }

    // Remove reader view class and attribute
    container.classList.remove('readerView')
    container.removeAttribute('data-readerviewprofile')
  }

  // Remove blocked image placeholders
  const blockedImages = document.querySelectorAll('.blockedImage')
  blockedImages.forEach((img) => img.remove())

  // Remove style element
  const styleElement = document.getElementById('ervStyleElement')
  styleElement?.remove()
}

/**
 * Restore original attributes
 *
 * Puts back the attributes that were stripped by stripAttributes()
 *
 * Reference: legacy/src/utils/disableReaderView.js lines 14-20
 */
function restoreAttributes(element: HTMLElement): void {
  const attributesToRestore = ['style', 'class', 'id', 'align', 'color', 'background', 'bgcolor', 'width', 'height']

  for (const attr of attributesToRestore) {
    const dataAttr = `data-removed${attr}`
    if (element.hasAttribute(dataAttr)) {
      const value = element.getAttribute(dataAttr)
      if (value) element.setAttribute(attr, value)
      element.removeAttribute(dataAttr)
    }
  }
}
