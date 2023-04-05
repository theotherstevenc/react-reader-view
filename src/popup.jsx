import React, { useState, useEffect } from 'react'
import ReactDOM from 'react-dom/client'

import enableReaderView from './utils/enableReaderView'
import disableReaderView from './utils/disableReaderView'
import initialState from './utils/initialState'

import './css/styles.css'

const Popup = () => {
  const [profile, setProfile] = useState(initialState)
  const [isReaderViewEnabled, setIsReaderViewEnabled] = useState(JSON.parse(localStorage.getItem('readerViewEnabled')) || false)

  const toggleReaderView = (profile, readerViewEnabled) => {
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
      const activeTabId = tabs[0].id
      chrome.scripting.executeScript({
        target: { tabId: activeTabId },
        args: [profile],
        function: readerViewEnabled ? enableReaderView : disableReaderView,
      })
    })
    localStorage.setItem('readerViewEnabled', readerViewEnabled)
    setIsReaderViewEnabled(readerViewEnabled)
  }

  useEffect(() => {
    if (isReaderViewEnabled) {
      toggleReaderView(profile, true)
    }
    localStorage.setItem('profile', JSON.stringify(profile))
  }, [profile])

  return (
    // move into separate components
    <form id='optionsForm'>
      <menu role='menubar' className='profiles'>
        <input
          role='menuitemradio'
          type='radio'
          name='readerviewProfile'
          id='readerViewA'
          value='A'
          checked={profile.currentProfile === 'A'}
          onChange={(e) => {
            setProfile((profile) => ({
              ...profile,
              currentProfile: e.target.value,
            }))
          }}
        />
        <label className='button' id='readerViewALabel' htmlFor='readerViewA'>
          {profile.profileA_name}
        </label>
        <input
          role='menuitemradio'
          type='radio'
          name='readerviewProfile'
          id='readerViewB'
          value='B'
          checked={profile.currentProfile === 'B'}
          onChange={(e) => {
            setProfile((profile) => ({
              ...profile,
              currentProfile: e.target.value,
            }))
          }}
        />
        <label className='button' id='readerViewBLabel' htmlFor='readerViewB'>
          {profile.profileB_name}
        </label>
        <input
          role='menuitemradio'
          type='radio'
          name='readerviewProfile'
          id='readerViewC'
          value='C'
          checked={profile.currentProfile === 'C'}
          onChange={(e) => {
            setProfile((profile) => ({
              ...profile,
              currentProfile: e.target.value,
            }))
          }}
        />
        <label className='button' id='readerViewCLabel' htmlFor='readerViewC'>
          {profile.profileC_name}
        </label>
        <button
          className={`button${isReaderViewEnabled ? '' : ' highlight'}`}
          id='readerViewOff'
          onClick={(e) => {
            e.preventDefault()
            toggleReaderView(null, false)
          }}
        >
          Disable Reader View
        </button>
        <button
          className={`button${isReaderViewEnabled ? ' highlight' : ''}`}
          id='readerViewOn'
          onClick={(e) => {
            e.preventDefault()
            toggleReaderView(profile, true)
          }}
        >
          Enable Reader View
        </button>
        <button
          className='button'
          onClick={(e) => {
            e.preventDefault()
            localStorage.clear()
            setProfile(initialState)
            if (isReaderViewEnabled) {
              toggleReaderView(profile, true)
            }
          }}
        >
          Reset
        </button>
      </menu>
      <fieldset className='profileA' hidden>
        <legend>Profile settings</legend>
        <div className='selectStyles'>
          <label>
            <span>Name:</span>
            <span>
              <input
                type='text'
                name='nameA'
                id='nameA'
                value={profile.profileA_name}
                onChange={(e) => {
                  setProfile((profile) => ({
                    ...profile,
                    profileA_name: e.target.value,
                  }))
                }}
              />
            </span>
          </label>
          <label>
            <span>
              Background: <span id='backgroundColorValueA'></span>
            </span>
            <span>
              <input
                type='color'
                name='backgroundColorA'
                id='backgroundColorA'
                value={profile.profileA_backgroundColor}
                onChange={(e) => {
                  setProfile((profile) => ({
                    ...profile,
                    profileA_backgroundColor: e.target.value,
                  }))
                }}
              />
            </span>
          </label>
          <label>
            <span>
              Text colour: <span id='colorValueA'></span>
            </span>
            <span>
              <input
                type='color'
                name='colorA'
                id='colorA'
                value={profile.profileA_color}
                onChange={(e) => {
                  setProfile((profile) => ({
                    ...profile,
                    profileA_color: e.target.value,
                  }))
                }}
              />
            </span>
          </label>
          <label>
            <span>
              Link colour: <span id='linkColorValueA'></span>
            </span>
            <span>
              <input
                type='color'
                name='linkColorA'
                id='linkColorA'
                value={profile.profileA_linkColor}
                onChange={(e) => {
                  setProfile((profile) => ({
                    ...profile,
                    profileA_linkColor: e.target.value,
                  }))
                }}
              />
            </span>
          </label>
        </div>
      </fieldset>
      <fieldset className='profileB' hidden>
        <legend>Profile settings</legend>
        <div className='selectStyles'>
          <label>
            <span>Name:</span>
            <span>
              <input
                type='text'
                name='nameB'
                id='nameB'
                value={profile.profileB_name}
                onChange={(e) => {
                  setProfile((profile) => ({
                    ...profile,
                    profileB_name: e.target.value,
                  }))
                }}
              />
            </span>
          </label>
          <label>
            <span>
              Background: <span id='backgroundColorValueB'></span>
            </span>
            <span>
              <input
                type='color'
                name='backgroundColorB'
                id='backgroundColorB'
                value={profile.profileB_backgroundColor}
                onChange={(e) => {
                  setProfile((profile) => ({
                    ...profile,
                    profileB_backgroundColor: e.target.value,
                  }))
                }}
              />
            </span>
          </label>
          <label>
            <span>
              Text colour: <span id='colorValueB'></span>
            </span>
            <span>
              <input
                type='color'
                name='colorB'
                id='colorB'
                value={profile.profileB_color}
                onChange={(e) => {
                  setProfile((profile) => ({
                    ...profile,
                    profileB_color: e.target.value,
                  }))
                }}
              />
            </span>
          </label>
          <label>
            <span>
              Link colour: <span id='linkColorValueB'></span>
            </span>
            <span>
              <input
                type='color'
                name='linkColorB'
                id='linkColorB'
                value={profile.profileB_linkColor}
                onChange={(e) => {
                  setProfile((profile) => ({
                    ...profile,
                    profileB_linkColor: e.target.value,
                  }))
                }}
              />
            </span>
          </label>
        </div>
      </fieldset>
      <fieldset className='profileC' hidden>
        <legend>Profile settings</legend>
        <div className='selectStyles'>
          <label>
            <span>Name:</span>
            <span>
              <input
                type='text'
                name='nameC'
                id='nameC'
                value={profile.profileC_name}
                onChange={(e) => {
                  setProfile((profile) => ({
                    ...profile,
                    profileC_name: e.target.value,
                  }))
                }}
              />
            </span>
          </label>
          <label>
            <span>
              Background: <span id='backgroundColorValueC'></span>
            </span>
            <span>
              <input
                type='color'
                name='backgroundColorC'
                id='backgroundColorC'
                value={profile.profileC_backgroundColor}
                onChange={(e) => {
                  setProfile((profile) => ({
                    ...profile,
                    profileC_backgroundColor: e.target.value,
                  }))
                }}
              />
            </span>
          </label>
          <label>
            <span>
              Text colour: <span id='colorValueC'></span>
            </span>
            <span>
              <input
                type='color'
                name='colorC'
                id='colorC'
                value={profile.profileC_color}
                onChange={(e) => {
                  setProfile((profile) => ({
                    ...profile,
                    profileC_color: e.target.value,
                  }))
                }}
              />
            </span>
          </label>
          <label>
            <span>
              Link colour: <span id='linkColorValueC'></span>
            </span>
            <span>
              <input
                type='color'
                name='linkColorC'
                id='linkColorC'
                value={profile.profileC_linkColor}
                onChange={(e) => {
                  setProfile((profile) => ({
                    ...profile,
                    profileC_linkColor: e.target.value,
                  }))
                }}
              />
            </span>
          </label>
        </div>
      </fieldset>
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
                  setProfile((profile) => ({
                    ...profile,
                    maxWidth: e.target.value,
                  }))
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
                  setProfile((profile) => ({
                    ...profile,
                    textAlign: e.target.value,
                  }))
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
                  setProfile((profile) => ({
                    ...profile,
                    fontSize: e.target.value,
                  }))
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
                  setProfile((profile) => ({
                    ...profile,
                    lineHeight: e.target.value,
                  }))
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
                  setProfile((profile) => ({
                    ...profile,
                    wordSpacing: e.target.value,
                  }))
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
                  setProfile((profile) => ({
                    ...profile,
                    letterSpacing: e.target.value,
                  }))
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
                  setProfile((profile) => ({
                    ...profile,
                    blockImages: e.target.checked,
                  }))
                }}
              />
            </span>
          </label>
        </div>
      </details>
    </form>
  )
}

const root = ReactDOM.createRoot(document.getElementById('react-target'))
root.render(
  <React.StrictMode>
    <Popup />
  </React.StrictMode>
)
