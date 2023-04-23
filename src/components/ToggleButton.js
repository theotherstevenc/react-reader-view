import React from 'react'

const ToggleButton = ({ toggleButton, setToggleButton }) => {
  return (
    <button
      type='button'
      className='button'
      id='toggleReaderView'
      onClick={() => {
        setToggleButton(!toggleButton)
        localStorage.setItem('toggleButton', !toggleButton)
      }}
    >
      {toggleButton ? 'Disable' : 'Enable'} Reader View
    </button>
  )
}

export default ToggleButton
