const interpolateStyles = (profile) => {
  const styleSheet = `
    .readerView.readerView * {
      all: revert
    }
    .readerView.readerView [date-hidden]{
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
      background:${profile.profileA_backgroundColor};
      color: ${profile.profileA_color};
    }
    .readerView[data-readerviewprofile="A"] :is(a, a *) {
        text-decoration: underline;
        color:${profile.profileA_linkColor};
    }
    .readerView[data-readerviewprofile="B"]{
      background:${profile.profileB_backgroundColor};
      color: ${profile.profileB_color};
    }
    .readerView[data-readerviewprofile="B"] :is(a, a *) {
        text-decoration: underline;
        color:${profile.profileB_linkColor};
    }
    .readerView[data-readerviewprofile="C"]{
      background:${profile.profileC_backgroundColor};
      color: ${profile.profileC_color};
    }
    .readerView[data-readerviewprofile="C"] :is(a, a *) {
        text-decoration: underline;
        color:${profile.profileC_linkColor};
    }
    .readerView.readerView {
      text-align:${profile.textAlign};
      font-family:${profile.fontFamily};
      font-size:${profile.fontSize}rem;
      line-height:${profile.lineHeight};
      word-spacing:${profile.wordSpacing}em;
      letter-spacing:${profile.letterSpacing}em;
      max-width: ${profile.maxWidth}em;
      margin: 0 auto;
      overflow: auto; /* For when things can't collapse far enough */
      padding: 1em !important; /* override yahoo */
    }
    .readerView.readerView *{
      text-align:${profile.textAlign};
    }
  .readerView.readerView button{display:none} /* Outlook zoom button */
  `
  let style = document.querySelectorAll('.blockedImage')
  for (let item of Array.from(style)) {
    item.remove()
  }

  if (window.location.hostname === 'mail.google.com') {
    const queryString = window.location.search
    const urlParams = new URLSearchParams(queryString)
    const view = urlParams.get('view')
    if (view === 'lg') {
      wrappers = document.querySelectorAll('table.message > tbody > tr > td > table > tbody > tr:last-of-type > td > div')
    } else {
      wrappers = document.querySelectorAll('.a3s')
    }
  }

  if (!document.querySelector('#ervStyleElement')) {
    const ervStyleElement = document.createElement('style')
    ervStyleElement.setAttribute('id', 'ervStyleElement')
    wrappers[0].parentElement.prepend(ervStyleElement)
  }

  for (let wrapper of Array.from(wrappers)) {
    const iframe = wrapper.querySelector('iframe')
    if (iframe === null) {
      wrapper.classList.add('readerView')
      wrapper.setAttribute('data-readerViewProfile', profile.currentProfile)
      document.querySelector('#ervStyleElement').replaceChildren(styleSheet)
    } else {
      alert('Reader view does not yet support AMP email')
      break
    }
  }

  let emails = Array.from(document.querySelectorAll('.readerView *'))

  for (let item of emails) {
    let style = window.getComputedStyle(item)
    if (style.display === 'none') {
      item.setAttribute('date-hidden', '')
    }
    if (item.getAttribute('aria-hidden') == 'true') {
      item.setAttribute('date-hidden', '')
    }
    if (item.hasAttribute('data-erv-emoji')) {
      item.remove()
    }
    if (item.hasAttribute('data-emoji') && profile.blockImages == false) {
      let alt = item.getAttribute('alt')
      item.insertAdjacentHTML('beforebegin', '<span data-erv-emoji>' + alt + '</span>')
      item.setAttribute('date-hidden', '')
    }

    if (profile.blockImages) {
      if (item.tagName == 'IMG' && !item.hasAttribute('hidden')) {
        let alt = item.getAttribute('alt')
        if (alt == null || alt.trim() == '') {
          alt = ''
        }
        let fauxImg = document.createElement('span')

        if (item.parentNode.tagName == 'A' && item.parentNode.children.length == '1' && item.parentNode.textContent.trim() == '') {
          if (alt == '') {
            alt = item.parentNode.getAttribute('href')
          }
        }
        fauxImg.innerText = alt.trim()
        fauxImg.classList.add('blockedImage')
        item.insertAdjacentHTML('beforebegin', fauxImg.outerHTML)
      }
    }

    if (item.tagName == 'A' && item.innerHTML.trim() == '') {
      let href = item.getAttribute('href')
      item.insertAdjacentHTML('afterbegin', href)
    }

    if (item.innerHTML.trim() == '&nbsp;') {
      item.innerHTML = ''
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
    function replaceAttribute(attribute) {
      if (item.hasAttribute(attribute)) {
        let attributeValue = item.getAttribute(attribute)
        let attributeName = 'data-removed' + attribute
        item.setAttribute(attributeName, attributeValue)
        item.removeAttribute(attribute)
      }
    }
  }
}
export default interpolateStyles
