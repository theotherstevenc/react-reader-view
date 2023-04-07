import React from 'react'
import { useState } from 'react'

const Details = (profile, setProfile) => {
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
              value={profile.maxWidth}
              onChange={(e) => {
                setProfile({
                  ...profile,
                  maxWidth: e.target.value,
                })
              }}
            />
          </span>
        </label>
        <label>
          <span>
            Text align: <span id='textAlignValue'></span>
          </span>
          <span>
            <select
              value={profile.textAlign}
              name='textAlign'
              id='textAlign'
              onChange={(e) => {
                setProfile({
                  ...profile,
                  textAlign: e.target.value,
                })
              }}
            >
              {['start', 'center', 'end'].map((el) => (
                <option key={el} value={el}>
                  {el}
                </option>
              ))}
            </select>
          </span>
        </label>
        <label>
          <span>
            Font family: <span id='fontFamilyValue'></span>
          </span>
          <span>
            <select
              value={profile.fontFamily}
              name='fontFamily'
              id='fontFamily'
              onChange={(e) => {
                setProfile((profile) => ({
                  ...profile,
                  fontFamily: e.target.value,
                }))
              }}
            >
              {['serif', 'sans-serif', 'monospace', 'cursive'].map((el) => (
                <option key={el} value={el}>
                  {el}
                </option>
              ))}
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
              value={profile.fontSize}
              onChange={(e) => {
                setProfile({
                  ...profile,
                  fontSize: e.target.value,
                })
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
              value={profile.lineHeight}
              onChange={(e) => {
                setProfile({
                  ...profile,
                  lineHeight: e.target.value,
                })
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
              value={profile.wordSpacing}
              onChange={(e) => {
                setProfile({
                  ...profile,
                  wordSpacing: e.target.value,
                })
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
              value={profile.letterSpacing}
              onChange={(e) => {
                setProfile({
                  ...profile,
                  letterSpacing: e.target.value,
                })
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
              checked={profile.blockImages}
              onChange={(e) => {
                setProfile({
                  ...profile,
                  blockImages: e.target.checked,
                })
              }}
            />
          </span>
        </label>
      </div>
    </details>
  )
}

export default Details
