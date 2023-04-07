export const fieldsetDataProfiles = (profile) => {
  return [
    {
      type: 'text',
      name: 'name' + profile,
      id: 'name' + profile,
      value: 'profile' + profile + '_name',
      title: 'Name:',
    },
    {
      type: 'color',
      name: 'backgroundColor' + profile,
      id: 'backgroundColor' + profile,
      value: 'profile' + profile + '_backgroundColor',
      title: 'Background:',
    },
    {
      type: 'color',
      name: 'color' + profile,
      id: 'color' + profile,
      value: 'profile' + profile + '_color',
      title: 'Text colour:',
    },
    {
      type: 'color',
      name: 'linkColor' + profile,
      id: 'linkColor' + profile,
      value: 'profile' + profile + '_linkColor',
      title: 'Link colour:',
    },
  ]
}

export const profileButtonDataProperties = [
  {
    profile: 'A',
    id: 'readerViewA',
    value: 'A',
    styles: {
      backgroundColor: 'profileA_backgroundColor',
      color: 'profileA_color',
    },
  },
  {
    profile: 'B',
    id: 'readerViewB',
    value: 'B',
    styles: {
      backgroundColor: 'profileB_backgroundColor',
      color: 'profileB_color',
    },
  },
  {
    profile: 'C',
    id: 'readerViewC',
    value: 'C',
    styles: {
      backgroundColor: 'profileC_backgroundColor',
      color: 'profileC_color',
    },
  },
]
