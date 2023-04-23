const generalSettings = {
  textAlign: localStorage.getItem('textAlign') || 'start',
  fontFamily: localStorage.getItem('fontFamily') || 'sans-serif',
  fontSize: localStorage.getItem('fontSize') || '1',
  lineHeight: localStorage.getItem('lineHeight') || '1.5',
  wordSpacing: localStorage.getItem('wordSpacing') || '.2',
  letterSpacing: localStorage.getItem('letterSpacing') || '.08',
  maxWidth: localStorage.getItem('maxWidth') || '40',
  linkColor: localStorage.getItem('linkColor') || '#3101ee',
  blockImages: localStorage.getItem('blockImages') || false,
}

export default generalSettings
