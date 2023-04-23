import React from 'react'
import profiles from '../utils/profiles'
import generalSettings from '../utils/generalSettings'
import { useState, useEffect } from 'react'
import ToggleButton from './ToggleButton'
import Details from './Details'
import MenuFieldSet from './MenuFieldSet'
import ProfileFieldset from './ProfileFieldset'
import disableReaderView from '../utils/disableReaderView'
import enableReaderView from '../utils/enableReaderView'

const Form = () => {
  const [profile, setProfile] = useState(profiles)
  const [settings, setSettings] = useState(generalSettings)
  const [toggleButton, setToggleButton] = useState(JSON.parse(localStorage.getItem('toggleButton')) || false)
  const [currentProfile, setCurrentProfile] = useState(localStorage.getItem('currentProfile') || 'A')

  const allProps = {
    profile,
    setProfile,
    settings,
    setSettings,
    toggleButton,
    setToggleButton,
    currentProfile,
    setCurrentProfile,
    toggleReaderView,
  }

  const toggleReaderView = (toggleButton, profile, settings, currentProfile) => {
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
      const activeTabId = tabs[0].id
      chrome.scripting.executeScript({
        target: { tabId: activeTabId },
        function: toggleButton ? enableReaderView : disableReaderView,
        args: [profile, settings, currentProfile],
      })
    })
  }

  useEffect(() => {
    toggleReaderView(toggleButton, profile, settings, currentProfile)
  }, [])

  useEffect(() => {
    toggleReaderView(toggleButton, profile, settings, currentProfile)
  }, [toggleButton, profile, settings, currentProfile])

  return (
    <form id='optionsForm'>
      <ToggleButton {...allProps} />
      <MenuFieldSet {...allProps} />
      <ProfileFieldset {...allProps} />
      <Details {...allProps} />
    </form>
  )
}
export default Form
