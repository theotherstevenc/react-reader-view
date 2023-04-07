import React, { useState, useEffect } from 'react'
import ReactDOM from 'react-dom/client'
import { Details, Header, Footer, Fieldset, ProfileButtons, ToggleProfileButtons, ResetButton } from './components'
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
          <ProfileButtons profile={profile} setProfile={setProfile} profileButtonDataProperties={profileButtonDataProperties} />
          <ToggleProfileButtons profile={profile} toggleReaderView={toggleReaderView} isReaderViewEnabled={isReaderViewEnabled} />
          <ResetButton profile={profile} setProfile={setProfile} toggleReaderView={toggleReaderView} initialState={initialState} />
        </menu>
        <Fieldset currentProfile='A' profile={profile} setProfile={setProfile} fieldsetDataProfiles={fieldsetDataProfiles} />
        <Fieldset currentProfile='B' profile={profile} setProfile={setProfile} fieldsetDataProfiles={fieldsetDataProfiles} />
        <Fieldset currentProfile='C' profile={profile} setProfile={setProfile} fieldsetDataProfiles={fieldsetDataProfiles} />
        <Details profile={profile} setProfile={setProfile} />
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
