const store = JSON.parse(localStorage.getItem('profile'))
export const initialState = {
  currentProfile: store?.currentProfile || 'A',
  profileA_name: store?.profileA_name || 'Light',
  profileA_backgroundColor: store?.profileA_backgroundColor || '#FFFDD0',
  profileA_color: store?.profileA_color || '#202020',
  profileA_linkColor: store?.profileA_linkColor || '#3101ee',
  profileB_name: store?.profileB_name || 'Dark',
  profileB_backgroundColor: store?.profileB_backgroundColor || '#202020',
  profileB_color: store?.profileB_color || '#eeeeee',
  profileB_linkColor: store?.profileB_linkColor || '#8ab4f8',
  profileC_name: store?.profileC_name || 'Sepia',
  profileC_backgroundColor: store?.profileC_backgroundColor || '#ffeedd',
  profileC_color: store?.profileC_color || '#332211',
  profileC_linkColor: store?.profileC_linkColor || '#3101ee',
  textAlign: store?.textAlign || 'start',
  fontFamily: store?.fontFamily || 'sans-serif',
  fontSize: store?.fontSize || '1',
  lineHeight: store?.lineHeight || '1.5',
  wordSpacing: store?.wordSpacing || '.2',
  letterSpacing: store?.letterSpacing || '.08',
  maxWidth: store?.maxWidth || '40',
  linkColor: store?.linkColor || '#3101ee',
  blockImages: store?.blockImages || false,
}

export const readerViewEnabled = JSON.parse(localStorage.getItem('readerViewEnabled')) || false
