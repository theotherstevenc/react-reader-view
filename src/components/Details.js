import React from 'react'

const Details = ({ settings, setSettings }) => {
  return (
    <details>
      <summary>General settings</summary>
      <div className='selectStyles'>
        <label>
          <span>
            Width: <span id='maxWidthValue'></span>
          </span>
          <span>
            <input
              type='range'
              name='maxWidth'
              id='maxWidth'
              min='20'
              max='70'
              step='.5'
              value={settings.maxWidth}
              onChange={(e) => {
                setSettings({ ...settings, maxWidth: e.target.value })
                localStorage.setItem('maxWidth', e.target.value)
              }}
            />
          </span>
        </label>
        <label>
          <span>
            Font family: <span id='fontFamilyValue'></span>
          </span>
          <span>
            <select
              name='fontFamily'
              id='fontFamily'
              value={settings.fontFamily}
              onChange={(e) => {
                setSettings({ ...settings, fontFamily: e.target.value })
                localStorage.setItem('fontFamily', e.target.value)
              }}
            >
              <option value='serif'>serif</option>
              <option value='sans-serif'>sans-serif</option>
              <option value='monospace'>monospace</option>
              <option value='cursive'>cursive</option>
            </select>
          </span>
        </label>
        <label>
          <span>
            Font size: <span id='fontSizeValue'></span>
          </span>
          <span>
            <input
              type='range'
              name='fontSize'
              id='fontSize'
              min='.5'
              max='3'
              step='.25'
              value={settings.fontSize}
              onChange={(e) => {
                setSettings({ ...settings, fontSize: e.target.value })
                localStorage.setItem('fontSize', e.target.value)
              }}
            />
          </span>
        </label>
        <label>
          <span>
            Line height: <span id='lineHeightValue'></span>
          </span>
          <span>
            <input
              type='range'
              name='lineHeight'
              id='lineHeight'
              min='1'
              max='2'
              step='.1'
              value={settings.lineHeight}
              onChange={(e) => {
                setSettings({ ...settings, lineHeight: e.target.value })
                localStorage.setItem('lineHeight', e.target.value)
              }}
            />
          </span>
        </label>
        <label>
          <span>
            Word spacing: <span id='wordSpacingValue'></span>
          </span>
          <span>
            <input
              type='range'
              name='wordSpacing'
              id='wordSpacing'
              min='0'
              max='1'
              step='.1'
              value={settings.wordSpacing}
              onChange={(e) => {
                setSettings({ ...settings, wordSpacing: e.target.value })
                localStorage.setItem('wordSpacing', e.target.value)
              }}
            />
          </span>
        </label>
        <label>
          <span>
            Letter spacing: <span id='letterSpacingValue'></span>
          </span>
          <span>
            <input
              type='range'
              name='letterSpacing'
              id='letterSpacing'
              min='0'
              max='.3'
              step='.02'
              value={settings.letterSpacing}
              onChange={(e) => {
                setSettings({ ...settings, letterSpacing: e.target.value })
                localStorage.setItem('letterSpacing', e.target.value)
              }}
            />
          </span>
        </label>
        <label>
          <span>
            Block images: <span id='blockImagesValue'></span>
          </span>
          <span>
            <input
              type='checkbox'
              name='blockImages'
              id='blockImages'
              checked={settings.blockImages}
              onChange={(e) => {
                setSettings({ ...settings, blockImages: e.target.value })
                localStorage.setItem('blockImages', e.target.value)
              }}
            />
          </span>
        </label>
      </div>
    </details>
  )
}

export default Details
