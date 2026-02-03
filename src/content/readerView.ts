/**
 * Reader View Transformation Logic
 *
 * IMPORTANT: These functions must be SELF-CONTAINED (no imports) because they are
 * injected directly into web pages via chrome.scripting.executeScript()
 *
 * All helper functions are inline to avoid import/serialization issues.
 */

import type { Profile, Settings } from '@/shared/types'

/**
 * Enable reader view on the current email
 *
 * SELF-CONTAINED: All logic inline, no external function calls
 */
export function enableReaderView(profiles: Profile[], settings: Settings, currentProfile: Profile['id']): void {
  let wrappers: Element[] = []

  // Remove old blocked images from previous runs
  const oldBlocked = document.querySelectorAll('.blockedImage')
  for (const item of Array.from(oldBlocked)) {
    item.remove()
  }

  // Provider-specific email container detection (inline - no imports)
  if (window.location.hostname === 'mail.google.com') {
    const queryString = window.location.search
    const urlParams = new URLSearchParams(queryString)
    const view = urlParams.get('view')
    if (view === 'lg') {
      wrappers = Array.from(document.querySelectorAll('table.message > tbody > tr > td > table > tbody > tr:last-of-type > td > div'))
    } else {
      wrappers = Array.from(document.querySelectorAll('.a3s'))
    }
  }

  if (window.location.hostname === 'outlook.live.com') {
    wrappers = Array.from(document.querySelectorAll("[aria-label='Message body']"))
  }

  if (window.location.hostname === 'mail.yahoo.com') {
    wrappers = Array.from(document.querySelectorAll('.msg-body'))
  }

  if (window.location.hostname === 'mail.aol.com') {
    wrappers = Array.from(document.querySelectorAll('.AOLWebSuite > div[id], .msg-body'))
  }

  if (wrappers.length === 0) {
    alert('Email Reader View: Could not find email content on this page')
    return
  }

  // Generate CSS (all inline - matching legacy exactly)
  const styleSheet = `
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
      overflow: auto;
      padding: 1em !important;
    }
    .readerView.readerView *{
      text-align:${settings.textAlign};
    }
  .readerView.readerView button{display:none}
  `

  // Create/update style element
  if (!document.querySelector('#ervStyleElement')) {
    const ervStyleElement = document.createElement('style')
    ervStyleElement.setAttribute('id', 'ervStyleElement')
    wrappers[0].parentElement?.prepend(ervStyleElement)
  }

  // Apply reader view to all wrappers
  for (const wrapper of Array.from(wrappers)) {
    const iframe = wrapper.querySelector('iframe')
    if (iframe === null) {
      wrapper.classList.add('readerView')
      wrapper.setAttribute('data-readerViewProfile', currentProfile)
      const styleEl = document.querySelector('#ervStyleElement')
      if (styleEl) {
        styleEl.textContent = styleSheet
      }
    } else {
      alert('Reader view does not yet support AMP email')
      break
    }
  }

  // Process all elements (all inline - matching legacy exactly)
  const emails = Array.from(document.querySelectorAll('.readerView *'))

  for (const item of emails) {
    const element = item as HTMLElement
    const style = window.getComputedStyle(element)

    if (style.display === 'none') {
      element.setAttribute('data-hidden', '')
    }

    if (element.getAttribute('aria-hidden') === 'true') {
      element.setAttribute('data-hidden', '')
    }

    if (element.hasAttribute('data-erv-emoji')) {
      element.remove()
      continue
    }

    if (element.hasAttribute('data-emoji') && settings.blockImages === false) {
      const alt = element.getAttribute('alt')
      element.insertAdjacentHTML('beforebegin', '<span data-erv-emoji>' + alt + '</span>')
      element.setAttribute('data-hidden', '')
    }

    if (settings.blockImages) {
      if (element.tagName === 'IMG' && !element.hasAttribute('hidden')) {
        let alt = element.getAttribute('alt')
        if (alt === null || alt.trim() === '') {
          alt = ''
        }
        const fauxImg = document.createElement('span')

        if (
          element.parentNode &&
          (element.parentNode as HTMLElement).tagName === 'A' &&
          (element.parentNode as HTMLElement).children.length === 1 &&
          (element.parentNode as HTMLElement).textContent?.trim() === ''
        ) {
          if (alt === '') {
            alt = (element.parentNode as HTMLElement).getAttribute('href') || ''
          }
        }
        fauxImg.innerText = alt.trim()
        fauxImg.classList.add('blockedImage')
        element.insertAdjacentHTML('beforebegin', fauxImg.outerHTML)
      }
    }

    if (element.tagName === 'A' && element.innerHTML.trim() === '') {
      const href = element.getAttribute('href')
      if (href) element.insertAdjacentHTML('afterbegin', href)
    }

    if (element.innerHTML.trim() === '&nbsp;') {
      element.innerHTML = ''
    }

    // Strip attributes inline
    const replaceAttribute = (attribute: string) => {
      if (element.hasAttribute(attribute)) {
        const attributeValue = element.getAttribute(attribute)
        const attributeName = 'data-removed' + attribute
        element.setAttribute(attributeName, attributeValue || '')
        element.removeAttribute(attribute)
      }
    }

    replaceAttribute('style')
    replaceAttribute('class')
    replaceAttribute('id')
    replaceAttribute('align')
    replaceAttribute('color')
    replaceAttribute('background')
    replaceAttribute('bgcolor')
    replaceAttribute('width')
    replaceAttribute('height')
  }
}

/**
 * Disable reader view
 *
 * SELF-CONTAINED: All logic inline, no external function calls
 */
export function disableReaderView(): void {
  const containers = document.querySelectorAll('.readerView')

  for (const container of Array.from(containers)) {
    const elements = container.querySelectorAll('*')

    for (const element of Array.from(elements)) {
      const item = element as HTMLElement

      // Restore attributes inline
      const restoreAttribute = (attribute: string) => {
        if (item.hasAttribute('data-removed' + attribute)) {
          const attributeValue = item.getAttribute('data-removed' + attribute)
          const attributeName = 'data-removed' + attribute
          if (attributeValue) item.setAttribute(attribute, attributeValue)
          item.removeAttribute(attributeName)
        }
      }

      restoreAttribute('style')
      restoreAttribute('class')
      restoreAttribute('id')
      restoreAttribute('align')
      restoreAttribute('color')
      restoreAttribute('background')
      restoreAttribute('bgcolor')
      restoreAttribute('width')
      restoreAttribute('height')

      if (item.hasAttribute('data-hidden')) {
        item.removeAttribute('data-hidden')
      }

      if (item.hasAttribute('data-erv-emoji')) {
        item.remove()
      }
    }

    container.classList.remove('readerView')
    container.removeAttribute('data-readerviewprofile')
  }

  const blockedImages = document.querySelectorAll('.blockedImage')
  for (const item of Array.from(blockedImages)) {
    item.remove()
  }

  const styleElement = document.getElementById('ervStyleElement')
  if (styleElement) {
    styleElement.remove()
  }
}
