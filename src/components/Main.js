import React, { useState, useEffect } from 'react'
import disableReaderView from '../utils/disableReaderView'
import enableReaderView from '../utils/enableReaderView'
import initialProfiles from '../utils/initialProfiles'
import initialSettings from '../utils/initialSettings'

const App = () => {
  const profilesFromLocalStorage = JSON.parse(localStorage.getItem('localProfiles')) || initialProfiles
  const settingsFromLocalStorage = JSON.parse(localStorage.getItem('localSettings')) || initialSettings
  const currentProfileFromLocalStorage = localStorage.getItem('currentProfile') || 'A'
  const toggleButtonFromLocalStorage = JSON.parse(localStorage.getItem('toggleButton')) || false

  const [toggleButton, setToggleButton] = useState(toggleButtonFromLocalStorage)
  const [currentProfile, setCurrentProfile] = useState(currentProfileFromLocalStorage)
  const [profiles, setProfiles] = useState(profilesFromLocalStorage)
  const [settings, setSettings] = useState(settingsFromLocalStorage)

  const toggleReaderView = (toggleButton, profiles, settings, currentProfile) => {
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
      const activeTabId = tabs[0].id
      chrome.scripting.executeScript({
        target: { tabId: activeTabId },
        function: toggleButton ? enableReaderView : disableReaderView,
        args: [profiles, settings, currentProfile],
      })
    })
  }

  useEffect(() => {
    toggleReaderView(toggleButton, profiles, settings, currentProfile)
    localStorage.setItem('localProfiles', JSON.stringify(profiles))
    localStorage.setItem('localSettings', JSON.stringify(settings))
    localStorage.setItem('currentProfile', currentProfile)
    localStorage.setItem('toggleButton', toggleButton)
  }, [toggleButton, profiles, settings, currentProfile])

  return (
    <form id='optionsForm'>
      <button
        type='button'
        className='button'
        id='toggleReaderView'
        onClick={() => {
          setToggleButton(!toggleButton)
        }}
      >
        {toggleButton ? 'Disable' : 'Enable'} Reader View
      </button>
      <menu role='menubar' className='profiles'>
        <fieldset className='profiles'>
          <legend>Profile</legend>
          <div>
            {profiles.map(({ id, profile, name }) => {
              return (
                <React.Fragment key={id}>
                  <input
                    type='radio'
                    name='readerviewProfile'
                    id={profile}
                    checked={currentProfile === id}
                    value={id}
                    onChange={(e) => {
                      setCurrentProfile(e.target.value)
                    }}
                  />
                  <label className='button' id={profile + 'Label'} htmlFor={profile}>
                    {name}
                  </label>
                </React.Fragment>
              )
            })}
          </div>
        </fieldset>
      </menu>
      {profiles.map(({ id }, index) => {
        return (
          <fieldset key={id} className={currentProfile === id ? 'display-profile' : ''} hidden>
            <legend>Profile {id}</legend>
            <div className='selectStyles'>
              <label>
                <span>Name:</span>
                <span>
                  <input
                    type='text'
                    name={'name' + id}
                    id={'name' + id}
                    value={profiles[index].name}
                    onChange={(e) => {
                      setProfiles((previousProfiles) => {
                        const updatedProfiles = [...previousProfiles]
                        updatedProfiles[index].name = e.target.value
                        return updatedProfiles
                      })
                    }}
                  />
                </span>
              </label>
              <label>
                <span>
                  Background: <span id={'backgroundColorValue' + id}></span>
                </span>
                <span>
                  <input
                    type='color'
                    name={'backgroundColor' + id}
                    id={'backgroundColor' + id}
                    value={profiles[index].backgroundColor}
                    onChange={(e) => {
                      setProfiles((previousProfiles) => {
                        const updatedProfiles = [...previousProfiles]
                        updatedProfiles[index].backgroundColor = e.target.value
                        return updatedProfiles
                      })
                    }}
                  />
                </span>
              </label>
              <label>
                <span>
                  Text colour: <span id={'colorValue' + id}></span>
                </span>
                <span>
                  <input
                    type='color'
                    name={'color' + id}
                    id={'color' + id}
                    value={profiles[index].color}
                    onChange={(e) => {
                      setProfiles((previousProfiles) => {
                        const updatedProfiles = [...previousProfiles]
                        updatedProfiles[index].color = e.target.value
                        return updatedProfiles
                      })
                    }}
                  />
                </span>
              </label>
              <label>
                <span>
                  Link colour: <span id={'linkColorValue' + id}></span>
                </span>
                <span>
                  <input
                    type='color'
                    name={'linkColor' + id}
                    id={'linkColor' + id}
                    value={profiles[index].linkColor}
                    onChange={(e) => {
                      setProfiles((previousProfiles) => {
                        const updatedProfiles = [...previousProfiles]
                        updatedProfiles[index].linkColor = e.target.value
                        return updatedProfiles
                      })
                    }}
                  />
                </span>
              </label>
            </div>
          </fieldset>
        )
      })}
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
                  JSON.parse(localStorage.getItem('localSettings')).maxWidth = e.target.value
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
                  JSON.parse(localStorage.getItem('localSettings')).fontFamily = e.target.value
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
                  JSON.parse(localStorage.getItem('localSettings')).fontSize = e.target.value
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
                  JSON.parse(localStorage.getItem('localSettings')).lineHeight = e.target.value
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
                  JSON.parse(localStorage.getItem('localSettings')).wordSpacing = e.target.value
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
                  JSON.parse(localStorage.getItem('localSettings')).letterSpacing = e.target.value
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
                  setSettings({ ...settings, blockImages: e.target.checked })
                  JSON.parse(localStorage.getItem('localSettings')).blockImages = e.target.checked
                }}
              />
            </span>
          </label>
        </div>
      </details>
      <button
        type='button'
        className='button button-reset'
        onClick={() => {
          setProfiles(initialProfiles)
          setSettings(initialSettings)
        }}
      >
        Reset
      </button>
    </form>
  )
}

export default App
