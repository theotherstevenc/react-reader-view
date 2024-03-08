export type Profile = {
  id: string
  profile: string
  name: string
  backgroundColor: string
  color: string
  linkColor: string
}

export type Setting = {
  textAlign: string
  fontFamily: string
  fontSize: number
  lineHeight: number
  wordSpacing: number
  letterSpacing: number
  maxWidth: number
  linkColor: string
  blockImages: boolean
}

export const initialProfiles = [
  {
    id: 'A',
    profile: 'readerViewA',
    name: 'Light',
    backgroundColor: '#FFFDD0',
    color: '#202020',
    linkColor: '#3101ee',
  },
  {
    id: 'B',
    profile: 'readerViewB',
    name: 'Dark',
    backgroundColor: '#202020',
    color: '#eeeeee',
    linkColor: '#8ab4f8',
  },
  {
    id: 'C',
    profile: 'readerViewC',
    name: 'Sepia',
    backgroundColor: '#ffeedd',
    color: '#332211',
    linkColor: '#3101ee',
  },
]

export const initialSettings = {
  textAlign: 'start',
  fontFamily: 'sans-serif',
  fontSize: 1,
  lineHeight: 1.5,
  wordSpacing: 0.2,
  letterSpacing: 0.08,
  maxWidth: 40,
  linkColor: '#3101ee',
  blockImages: false,
}
