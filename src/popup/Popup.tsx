/**
 * Popup Component
 *
 * Main UI for the Email Reader View extension.
 * Allows users to enable/disable reader view, select profiles, and adjust settings.
 *
 * Reference: legacy/src/components/Main.js (322 lines)
 */

import { useState, useEffect, useCallback } from 'react'

import { disableReaderView, enableReaderView } from '@/content/readerView'
import { DEFAULT_PROFILES, DEFAULT_SETTINGS } from '@/shared/defaults'
import { getStorage, updateProfiles, updateSettings, updateCurrentProfile, updateEnabled } from '@/shared/storage'

import type { Profile, Settings } from '@/shared/types'

export function Popup() {
  // State - initialized with defaults, then loaded from storage
  const [profiles, setProfiles] = useState<Profile[]>(DEFAULT_PROFILES)
  const [settings, setSettings] = useState<Settings>(DEFAULT_SETTINGS)
  const [currentProfile, setCurrentProfile] = useState<Profile['id']>('A')
  const [isEnabled, setIsEnabled] = useState(false)
  const [loading, setLoading] = useState(true)

  // Load saved settings from storage on mount
  useEffect(() => {
    getStorage().then((data) => {
      setProfiles(data.profiles)
      setSettings(data.settings)
      setCurrentProfile(data.currentProfile)
      setIsEnabled(data.isEnabled)
      setLoading(false)
    })
  }, [])

  /**
   * Apply or remove reader view on the active tab
   * Uses chrome.scripting API to inject functions into the page
   */
  const applyReaderView = useCallback(async () => {
    const [tab] = await chrome.tabs.query({ active: true, currentWindow: true })
    if (!tab.id) return

    try {
      await chrome.scripting.executeScript({
        target: { tabId: tab.id },
        func: isEnabled ? enableReaderView : disableReaderView,
        args: [profiles, settings, currentProfile],
      })
    } catch (error) {
      console.error('Failed to apply reader view:', error)
    }
  }, [isEnabled, profiles, settings, currentProfile])

  // Apply reader view and save settings whenever state changes
  useEffect(() => {
    if (loading) return

    applyReaderView()

    // Save to storage
    updateProfiles(profiles)
    updateSettings(settings)
    updateCurrentProfile(currentProfile)
    updateEnabled(isEnabled)
  }, [profiles, settings, currentProfile, isEnabled, loading, applyReaderView])

  // Event handlers
  function handleToggle() {
    setIsEnabled(!isEnabled)
  }

  function handleProfileChange(profileId: Profile['id']) {
    setCurrentProfile(profileId)
  }

  function handleProfileUpdate(index: number, field: keyof Profile, value: string) {
    setProfiles((prev) => {
      const updated = [...prev]
      updated[index] = { ...updated[index], [field]: value }
      return updated
    })
  }

  function handleSettingsUpdate<K extends keyof Settings>(field: K, value: Settings[K]) {
    setSettings((prev) => ({ ...prev, [field]: value }))
  }

  function handleReset() {
    setProfiles(DEFAULT_PROFILES)
    setSettings(DEFAULT_SETTINGS)
  }

  // Show loading state
  if (loading) {
    return <div className='popup loading'>Loading...</div>
  }

  return (
    <div className='popup'>
      {/* Header */}
      <header>
        <h1>Email Reader View</h1>
      </header>

      <main>
        {/* Enable/Disable Toggle */}
        <button type='button' className='button toggle-button' onClick={handleToggle}>
          {isEnabled ? 'Disable' : 'Enable'} Reader View
        </button>

        {/* Profile Selector */}
        <fieldset className='profiles'>
          <legend>Select Profile</legend>
          <div className='profile-buttons'>
            {profiles.map((profile) => (
              <label key={profile.id}>
                <input type='radio' name='profile' value={profile.id} checked={currentProfile === profile.id} onChange={() => handleProfileChange(profile.id)} />
                <span className='button'>{profile.name}</span>
              </label>
            ))}
          </div>
        </fieldset>

        {/* Profile Color Editors */}
        {profiles.map((profile, index) => (
          <fieldset key={profile.id} hidden={currentProfile !== profile.id} className={currentProfile === profile.id ? 'display-profile' : ''}>
            <legend>{profile.name} Profile</legend>
            <div className='form-grid'>
              <label>
                <span>Name:</span>
                <input type='text' value={profile.name} onChange={(e) => handleProfileUpdate(index, 'name', e.target.value)} />
              </label>
              <label>
                <span>Background:</span>
                <input type='color' value={profile.backgroundColor} onChange={(e) => handleProfileUpdate(index, 'backgroundColor', e.target.value)} />
              </label>
              <label>
                <span>Text:</span>
                <input type='color' value={profile.textColor} onChange={(e) => handleProfileUpdate(index, 'textColor', e.target.value)} />
              </label>
              <label>
                <span>Links:</span>
                <input type='color' value={profile.linkColor} onChange={(e) => handleProfileUpdate(index, 'linkColor', e.target.value)} />
              </label>
            </div>
          </fieldset>
        ))}

        {/* General Settings */}
        <details>
          <summary>General Settings</summary>
          <div className='form-grid'>
            <label>
              <span>Width:</span>
              <input type='range' min='20' max='70' step='0.5' value={settings.maxWidth} onChange={(e) => handleSettingsUpdate('maxWidth', parseFloat(e.target.value))} />
            </label>
            <label>
              <span>Font family:</span>
              <select value={settings.fontFamily} onChange={(e) => handleSettingsUpdate('fontFamily', e.target.value as Settings['fontFamily'])}>
                <option value='serif'>serif</option>
                <option value='sans-serif'>sans-serif</option>
                <option value='monospace'>monospace</option>
                <option value='cursive'>cursive</option>
              </select>
            </label>
            <label>
              <span>Font size:</span>
              <input type='range' min='0.5' max='3' step='0.25' value={settings.fontSize} onChange={(e) => handleSettingsUpdate('fontSize', parseFloat(e.target.value))} />
            </label>
            <label>
              <span>Line height:</span>
              <input type='range' min='1' max='2' step='0.1' value={settings.lineHeight} onChange={(e) => handleSettingsUpdate('lineHeight', parseFloat(e.target.value))} />
            </label>
            <label>
              <span>Word spacing:</span>
              <input type='range' min='0' max='1' step='0.1' value={settings.wordSpacing} onChange={(e) => handleSettingsUpdate('wordSpacing', parseFloat(e.target.value))} />
            </label>
            <label>
              <span>Letter spacing:</span>
              <input type='range' min='0' max='0.3' step='0.02' value={settings.letterSpacing} onChange={(e) => handleSettingsUpdate('letterSpacing', parseFloat(e.target.value))} />
            </label>
            <label>
              <span>Block images:</span>
              <input type='checkbox' checked={settings.blockImages} onChange={(e) => handleSettingsUpdate('blockImages', e.target.checked)} />
            </label>
          </div>
          <button type='button' className='button button-reset' onClick={handleReset}>
            Reset to Defaults
          </button>
        </details>
      </main>

      {/* Footer */}
      <footer>
        <p className='emc-credit'>
          <a href='https://emailmarkup.org/' target='_blank' rel='noopener noreferrer'>
            Email Markup Consortium
          </a>
        </p>
      </footer>
    </div>
  )
}
