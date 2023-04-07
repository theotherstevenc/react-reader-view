const localProfile = JSON.parse(localStorage.getItem('profile'))

export const initialState = {
  currentProfile: localProfile?.currentProfile || 'A',
  profileA_name: localProfile?.profileA_name || 'Light',
  profileA_backgroundColor: localProfile?.profileA_backgroundColor || '#FFFDD0',
  profileA_color: localProfile?.profileA_color || '#202020',
  profileA_linkColor: localProfile?.profileA_linkColor || '#3101ee',
  profileB_name: localProfile?.profileB_name || 'Dark',
  profileB_backgroundColor: localProfile?.profileB_backgroundColor || '#202020',
  profileB_color: localProfile?.profileB_color || '#eeeeee',
  profileB_linkColor: localProfile?.profileB_linkColor || '#8ab4f8',
  profileC_name: localProfile?.profileC_name || 'Sepia',
  profileC_backgroundColor: localProfile?.profileC_backgroundColor || '#ffeedd',
  profileC_color: localProfile?.profileC_color || '#332211',
  profileC_linkColor: localProfile?.profileC_linkColor || '#3101ee',
  textAlign: localProfile?.textAlign || 'start',
  fontFamily: localProfile?.fontFamily || 'sans-serif',
  fontSize: localProfile?.fontSize || '1',
  lineHeight: localProfile?.lineHeight || '1.5',
  wordSpacing: localProfile?.wordSpacing || '.2',
  letterSpacing: localProfile?.letterSpacing || '.08',
  maxWidth: localProfile?.maxWidth || '40',
  linkColor: localProfile?.linkColor || '#3101ee',
  blockImages: localProfile?.blockImages || false,
}

export const readerViewEnabled = JSON.parse(localStorage.getItem('readerViewEnabled')) || false
