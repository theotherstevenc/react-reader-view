import React from 'react'

const ToggleProfileButtons = ({ profile, toggleReaderView, isReaderViewEnabled }) => {
  return (
    <div>
      <input
        type='radio'
        name='enableReaderview'
        id='readerViewOff'
        checked={isReaderViewEnabled === false}
        onChange={() => {
          toggleReaderView(null, false)
        }}
      />
      <label className='button toggleReaderView' id='readerViewOffLabel' htmlFor='readerViewOff'>
        Off
      </label>
      <input
        type='radio'
        name='enableReaderview'
        id='readerViewOn'
        checked={isReaderViewEnabled === true}
        onChange={() => {
          toggleReaderView(profile, true)
        }}
      />
      <label className='button toggleReaderView' id='readerViewOnLabel' htmlFor='readerViewOn'>
        On
      </label>
    </div>
  )
}
export default ToggleProfileButtons
