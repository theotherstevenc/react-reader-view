import React from 'react'

const ResetButton = ({ profile, setProfile, toggleReaderView, isReaderViewEnabled, initialState }) => {
  return (
    <button
      type='button'
      className='button'
      onClick={() => {
        localStorage.clear()
        setProfile({ ...initialState, currentProfile: profile.currentProfile })
        if (isReaderViewEnabled) toggleReaderView(profile, true)
      }}
    >
      Reset
    </button>
  )
}
export default ResetButton
