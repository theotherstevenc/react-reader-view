import React, { useState, useEffect } from 'react'
import ReactDOM from 'react-dom/client'
import Header from './components/Header'
import Footer from './components/Footer'
import Fieldset from './components/Fieldset'
import Details from './components/Details'
import ProfileButtons from './components/ProfileButtons'
import ToggleProfileButtons from './components/ToggleProfileButtons'
import ResetButton from './components/ResetButton'

import enableReaderView from './utils/enableReaderView'
import disableReaderView from './utils/disableReaderView'
import { initialState, readerViewEnabled } from './utils/initialState'
import { fieldsetDataProfiles, profileButtonDataProperties } from './utils/componentDataProperties'

import './css/styles.css'

const Popup = () => {
  const [profile, setProfile] = useState(initialState)
  const [isReaderViewEnabled, setIsReaderViewEnabled] = useState(readerViewEnabled)

  const toggleReaderView = (profile, readerViewEnabled) => {
    // chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
    //   const activeTabId = tabs[0].id
    //   chrome.scripting.executeScript({
    //     target: { tabId: activeTabId },
    //     args: [profile],
    //     function: readerViewEnabled ? enableReaderView : disableReaderView,
    //   })
    // })
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
    <>
      <Header />
      <form id='optionsForm'>
        <menu role='menubar' className='profiles'>
          <ProfileButtons profileButtonDataProperties={profileButtonDataProperties} profile={profile} setProfile={setProfile} />
          <ToggleProfileButtons profile={profile} toggleReaderView={toggleReaderView} isReaderViewEnabled={isReaderViewEnabled} />
          <ResetButton initialState={initialState} profile={profile} setProfile={setProfile} toggleReaderView={toggleReaderView} />
        </menu>
        {['A', 'B', 'C'].map((el) => (
          <Fieldset key={el} currentProfile={el} profile={profile} setProfile={setProfile} fieldsetDataProfiles={fieldsetDataProfiles} />
        ))}
        <Details setProfile={setProfile} profile={profile} />
      </form>
      <Footer />
    </>
  )
}

const root = ReactDOM.createRoot(document.getElementById('email-reader-view'))
root.render(
  <React.StrictMode>
    <Popup />
  </React.StrictMode>
)
