import React, { useEffect, useState } from 'react'
import disableReaderView from '../utils/disableReaderView'
import enableReaderView from '../utils/enableReaderView'
import { type Profile, type Setting, initialProfiles, initialSettings } from '../utils/initialProfileSettings'
import { Button, Tab, TabList, TabPanel, TabPanels, Tabs } from '@chakra-ui/react'

let localProfile = localStorage.getItem('currentProfile') || 'A'
let localProfiles = JSON.parse(localStorage.getItem('localProfiles') || JSON.stringify(initialProfiles))
let localSettings = JSON.parse(localStorage.getItem('localSettings') || JSON.stringify(initialSettings))
let toggleButtonLocal = JSON.parse(localStorage.getItem('toggleButton') || 'false')

const Main = () => {
  const [currentProfile, setCurrentProfile] = useState(localProfile)
  const [profiles, setProfiles] = useState<Profile[]>(localProfiles)
  const [toggleButton, setToggleButton] = useState(toggleButtonLocal)
  const [settings, setSettings] = useState<Setting>(localSettings)

  const toggleReaderView = async (
    toggleButton: boolean,
    profiles: Profile[],
    settings: Setting,
    currentProfile: string,
  ) => {
    let [tab] = await chrome.tabs.query({ active: true, currentWindow: true })
    chrome.scripting.executeScript({
      target: { tabId: tab.id! },
      func: toggleButton ? enableReaderView : disableReaderView,
      args: [profiles, settings, currentProfile],
    })
  }

  useEffect(() => {
    toggleReaderView(toggleButton, profiles, settings, currentProfile)
    localStorage.setItem('currentProfile', currentProfile)
    localStorage.setItem('localProfiles', JSON.stringify(profiles))
    localStorage.setItem('localSettings', JSON.stringify(settings))
    localStorage.setItem('toggleButton', JSON.stringify(toggleButton))
  }, [toggleButton, profiles, settings, currentProfile])

  return (
    <>
      <Button
        w={'100%'}
        colorScheme='teal'
        variant='outline'
        onClick={() => {
          setToggleButton(!toggleButton)
        }}
      >
        {toggleButton ? 'Disable' : 'Enable'} Reader View
      </Button>

      <Tabs variant='enclosed' colorScheme='green'>
        <TabList>
          {profiles.map(({ id, name }) => {
            return <Tab key={id}>{name}</Tab>
          })}
        </TabList>
        <TabPanels>
          {profiles.map(({ name }, index) => {
            return (
              <TabPanel>
                <div className='selectStyles'>
                  <label>
                    <span>Name:</span>
                    <span>
                      <input
                        type='text'
                        value={profiles[index].name}
                        onChange={(e) => {
                          setProfiles((prevProfiles) => {
                            const newProfiles = [...prevProfiles]
                            newProfiles[index] = {
                              ...newProfiles[index],
                              name: e.target.value,
                            }
                            return newProfiles
                          })
                        }}
                      />
                    </span>
                  </label>
                  <label>
                    <span>Background:</span>
                    <span>
                      <input
                        type='color'
                        value={profiles[index].backgroundColor}
                        onChange={(e) => {
                          setProfiles((prevProfiles) => {
                            const newProfiles = [...prevProfiles]
                            newProfiles[index] = {
                              ...newProfiles[index],
                              backgroundColor: e.target.value,
                            }
                            return newProfiles
                          })
                        }}
                      />
                    </span>
                  </label>
                  <label>
                    <span>Text:</span>
                    <span>
                      <input
                        type='color'
                        value={profiles[index].color}
                        onChange={(e) => {
                          setProfiles((prevProfiles) => {
                            const newProfiles = [...prevProfiles]
                            newProfiles[index] = {
                              ...newProfiles[index],
                              color: e.target.value,
                            }
                            return newProfiles
                          })
                        }}
                      />
                    </span>
                  </label>
                  <label>
                    <span>Links:</span>
                    <span>
                      <input
                        type='color'
                        value={profiles[index].linkColor}
                        onChange={(e) => {
                          setProfiles((prevProfiles) => {
                            const newProfiles = [...prevProfiles]
                            newProfiles[index] = {
                              ...newProfiles[index],
                              linkColor: e.target.value,
                            }
                            return newProfiles
                          })
                        }}
                      />
                    </span>
                  </label>
                </div>
              </TabPanel>
            )
          })}
        </TabPanels>
      </Tabs>

      <details>
        <summary>General settings</summary>
        <div className='selectStyles'>
          <label>
            <span>Width:</span>
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
                  setSettings({ ...settings, maxWidth: Number(e.target.value) })
                }}
              />
            </span>
          </label>
          <label>
            <span>Font family:</span>
            <span>
              <select
                name='fontFamily'
                id='fontFamily'
                value={settings.fontFamily}
                onChange={(e) => {
                  setSettings({ ...settings, fontFamily: e.target.value })
                }}
              >
                {['serif', 'sans-serif', 'monospace', 'cursive'].map((option) => (
                  <option key={option} value={option}>
                    {option}
                  </option>
                ))}
              </select>
            </span>
          </label>
          <label>
            <span>Font size:</span>
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
                  setSettings({ ...settings, fontSize: Number(e.target.value) })
                }}
              />
            </span>
          </label>
          <label>
            <span>Line height:</span>
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
                  setSettings({ ...settings, lineHeight: Number(e.target.value) })
                }}
              />
            </span>
          </label>
          <label>
            <span>Word spacing:</span>
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
                  setSettings({ ...settings, wordSpacing: Number(e.target.value) })
                }}
              />
            </span>
          </label>
          <label>
            <span>Letter spacing:</span>
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
                  setSettings({ ...settings, letterSpacing: Number(e.target.value) })
                }}
              />
            </span>
          </label>
          <label>
            <span>Block images:</span>
            <span>
              <input
                type='checkbox'
                name='blockImages'
                id='blockImages'
                checked={settings.blockImages}
                onChange={(e) => {
                  setSettings({ ...settings, blockImages: e.target.checked })
                }}
              />
            </span>
          </label>
        </div>
        <div className='button-reset-container'>
          <button
            type='button'
            className='button button-reset button-reset-settings'
            onClick={() => {
              setSettings(initialSettings)
            }}
          >
            Reset Settings
          </button>
          <button
            type='button'
            className='button button-reset button-reset-profiles'
            onClick={() => {
              setProfiles(initialProfiles)
            }}
          >
            Reset Profiles
          </button>
        </div>
      </details>
    </>
  )
}

export default Main
