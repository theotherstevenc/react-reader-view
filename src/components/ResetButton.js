import React from 'react'

const ResetButton = ({ setProfile, setSettings, generalSettings }) => {
  return (
    <button
      type='button'
      className='button button-reset'
      onClick={() => {
        setProfile([
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
        ])
        setSettings(generalSettings)
      }}
    >
      Reset
    </button>
  )
}
export default ResetButton
