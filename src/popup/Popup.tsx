/**
 * Popup Component
 *
 * Main UI for the Email Reader View extension using Radix UI + Tailwind.
 * Accessible, lightweight, and human-readable.
 * Cross-browser compatible (Chrome, Firefox, Edge).
 *
 * Reference: legacy/src/components/Main.js (322 lines)
 */

import { useCallback, useEffect, useState } from 'react'
import * as Label from '@radix-ui/react-label'
import * as Separator from '@radix-ui/react-separator'
import * as Switch from '@radix-ui/react-switch'

import { disableReaderView, enableReaderView } from '@/content/readerView'
import { browser } from '@/shared/browserApi'
import { DEFAULT_PROFILES, DEFAULT_SETTINGS } from '@/shared/defaults'
import { getStorage, updateCurrentProfile, updateEnabled, updateProfiles, updateSettings } from '@/shared/storage'

import type { Profile, Settings } from '@/shared/types'

export function Popup() {
  // State - initialized with defaults, loaded from storage on mount
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
   * Apply or remove reader view on active tab
   */
  const applyReaderView = useCallback(async () => {
    const [tab] = await browser.tabs.query({ active: true, currentWindow: true })
    if (!tab.id) return

    try {
      await browser.scripting.executeScript({
        target: { tabId: tab.id },
        func: isEnabled ? enableReaderView : disableReaderView,
        args: [profiles, settings, currentProfile],
      })
    } catch (error) {
      console.error('Failed to apply reader view:', error)
    }
  }, [isEnabled, profiles, settings, currentProfile])

  // Apply reader view and save whenever state changes
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

  // Loading state
  if (loading) {
    return (
      <div className='flex items-center justify-center p-8'>
        <p className='text-gray-600'>Loading...</p>
      </div>
    )
  }

  const activeProfile = profiles.find((p) => p.id === currentProfile)

  return (
    <div className='w-80 p-4 bg-white'>
      {/* Header */}
      <header className='mb-4'>
        <h1 className='text-xl font-semibold text-gray-900'>Email Reader View</h1>
      </header>

      <main className='space-y-4'>
        {/* Enable/Disable Toggle */}
        <div className='flex items-center justify-between rounded-lg border border-gray-200 bg-gray-50 p-3'>
          <Label.Root htmlFor='enable-toggle' className='text-sm font-medium text-gray-700'>
            Reader View
          </Label.Root>
          <Switch.Root
            id='enable-toggle'
            checked={isEnabled}
            onCheckedChange={handleToggle}
            className='relative h-6 w-11 cursor-pointer rounded-full bg-gray-300 transition-colors data-[state=checked]:bg-green-500'
          >
            <Switch.Thumb className='block h-5 w-5 translate-x-0.5 rounded-full bg-white shadow-sm transition-transform data-[state=checked]:translate-x-[22px]' />
          </Switch.Root>
        </div>

        <Separator.Root className='h-px bg-gray-200' />

        {/* Profile Selector */}
        <div className='space-y-2'>
          <Label.Root className='text-sm font-medium text-gray-700'>Select Profile</Label.Root>
          <div className='grid grid-cols-3 gap-2'>
            {profiles.map((profile) => (
              <button
                key={profile.id}
                type='button'
                onClick={() => handleProfileChange(profile.id)}
                className={`rounded-md border-2 px-3 py-2 text-sm font-medium transition-colors ${
                  currentProfile === profile.id ? 'border-green-500 bg-green-50 text-green-700' : 'border-gray-200 bg-white text-gray-700 hover:border-gray-300'
                }`}
                aria-pressed={currentProfile === profile.id}
              >
                {profile.name}
              </button>
            ))}
          </div>
        </div>

        {/* Active Profile Colors */}
        {activeProfile && (
          <div className='space-y-3 rounded-lg border border-gray-200 bg-gray-50 p-3'>
            <h2 className='text-sm font-semibold text-gray-900'>{activeProfile.name} Colors</h2>

            <div className='space-y-2'>
              <Label.Root htmlFor='profile-name' className='text-xs font-medium text-gray-600'>
                Profile Name
              </Label.Root>
              <input
                id='profile-name'
                type='text'
                value={activeProfile.name}
                onChange={(e) =>
                  handleProfileUpdate(
                    profiles.findIndex((p) => p.id === currentProfile),
                    'name',
                    e.target.value,
                  )
                }
                className='w-full rounded border border-gray-300 px-2 py-1 text-sm focus:border-green-500 focus:outline-none'
              />
            </div>

            <div className='grid grid-cols-3 gap-2'>
              <div className='space-y-1'>
                <Label.Root htmlFor='bg-color' className='text-xs font-medium text-gray-600'>
                  Background
                </Label.Root>
                <input
                  id='bg-color'
                  type='color'
                  value={activeProfile.backgroundColor}
                  onChange={(e) =>
                    handleProfileUpdate(
                      profiles.findIndex((p) => p.id === currentProfile),
                      'backgroundColor',
                      e.target.value,
                    )
                  }
                  className='h-8 w-full cursor-pointer rounded border border-gray-300'
                />
              </div>

              <div className='space-y-1'>
                <Label.Root htmlFor='text-color' className='text-xs font-medium text-gray-600'>
                  Text
                </Label.Root>
                <input
                  id='text-color'
                  type='color'
                  value={activeProfile.textColor}
                  onChange={(e) =>
                    handleProfileUpdate(
                      profiles.findIndex((p) => p.id === currentProfile),
                      'textColor',
                      e.target.value,
                    )
                  }
                  className='h-8 w-full cursor-pointer rounded border border-gray-300'
                />
              </div>

              <div className='space-y-1'>
                <Label.Root htmlFor='link-color' className='text-xs font-medium text-gray-600'>
                  Links
                </Label.Root>
                <input
                  id='link-color'
                  type='color'
                  value={activeProfile.linkColor}
                  onChange={(e) =>
                    handleProfileUpdate(
                      profiles.findIndex((p) => p.id === currentProfile),
                      'linkColor',
                      e.target.value,
                    )
                  }
                  className='h-8 w-full cursor-pointer rounded border border-gray-300'
                />
              </div>
            </div>
          </div>
        )}

        {/* General Settings */}
        <details className='group rounded-lg border border-gray-200 bg-gray-50'>
          <summary className='cursor-pointer list-none p-3 text-sm font-semibold text-gray-900'>General Settings</summary>

          <div className='max-h-64 space-y-2 overflow-y-auto p-3 pt-0'>
            {/* Font Family */}
            <div className='space-y-1'>
              <Label.Root htmlFor='font-family' className='text-xs font-medium text-gray-600'>
                Font Family
              </Label.Root>
              <select
                id='font-family'
                value={settings.fontFamily}
                onChange={(e) => handleSettingsUpdate('fontFamily', e.target.value as Settings['fontFamily'])}
                className='w-full rounded border border-gray-300 bg-white px-2 py-1 text-sm focus:border-green-500 focus:outline-none'
              >
                <option value='serif'>Serif</option>
                <option value='sans-serif'>Sans-serif</option>
                <option value='monospace'>Monospace</option>
                <option value='cursive'>Cursive</option>
              </select>
            </div>

            {/* Max Width */}
            <div className='space-y-1'>
              <Label.Root htmlFor='max-width' className='text-xs font-medium text-gray-600'>
                Max Width: {settings.maxWidth}em
              </Label.Root>
              <input
                id='max-width'
                type='range'
                min='20'
                max='70'
                step='0.5'
                value={settings.maxWidth}
                onChange={(e) => handleSettingsUpdate('maxWidth', parseFloat(e.target.value))}
                className='w-full'
              />
            </div>

            {/* Font Size */}
            <div className='space-y-1'>
              <Label.Root htmlFor='font-size' className='text-xs font-medium text-gray-600'>
                Font Size: {settings.fontSize}rem
              </Label.Root>
              <input
                id='font-size'
                type='range'
                min='0.5'
                max='3'
                step='0.25'
                value={settings.fontSize}
                onChange={(e) => handleSettingsUpdate('fontSize', parseFloat(e.target.value))}
                className='w-full'
              />
            </div>

            {/* Line Height */}
            <div className='space-y-1'>
              <Label.Root htmlFor='line-height' className='text-xs font-medium text-gray-600'>
                Line Height: {settings.lineHeight}
              </Label.Root>
              <input
                id='line-height'
                type='range'
                min='1'
                max='2'
                step='0.1'
                value={settings.lineHeight}
                onChange={(e) => handleSettingsUpdate('lineHeight', parseFloat(e.target.value))}
                className='w-full'
              />
            </div>

            {/* Word Spacing */}
            <div className='space-y-1'>
              <Label.Root htmlFor='word-spacing' className='text-xs font-medium text-gray-600'>
                Word Spacing: {settings.wordSpacing}em
              </Label.Root>
              <input
                id='word-spacing'
                type='range'
                min='0'
                max='1'
                step='0.1'
                value={settings.wordSpacing}
                onChange={(e) => handleSettingsUpdate('wordSpacing', parseFloat(e.target.value))}
                className='w-full'
              />
            </div>

            {/* Letter Spacing */}
            <div className='space-y-1'>
              <Label.Root htmlFor='letter-spacing' className='text-xs font-medium text-gray-600'>
                Letter Spacing: {settings.letterSpacing}em
              </Label.Root>
              <input
                id='letter-spacing'
                type='range'
                min='0'
                max='0.3'
                step='0.02'
                value={settings.letterSpacing}
                onChange={(e) => handleSettingsUpdate('letterSpacing', parseFloat(e.target.value))}
                className='w-full'
              />
            </div>

            {/* Block Images */}
            <div className='flex items-center space-x-2'>
              <Switch.Root
                id='block-images'
                checked={settings.blockImages}
                onCheckedChange={(checked) => handleSettingsUpdate('blockImages', checked)}
                className='relative h-6 w-11 cursor-pointer rounded-full bg-gray-300 transition-colors data-[state=checked]:bg-green-500'
              >
                <Switch.Thumb className='block h-5 w-5 translate-x-0.5 rounded-full bg-white shadow-sm transition-transform data-[state=checked]:translate-x-[22px]' />
              </Switch.Root>
              <Label.Root htmlFor='block-images' className='text-sm font-medium text-gray-700'>
                Block Images
              </Label.Root>
            </div>

            {/* Reset Button */}
            <button type='button' onClick={handleReset} className='w-full rounded border border-gray-300 bg-white px-3 py-2 text-sm font-medium text-gray-700 transition-colors hover:bg-gray-50'>
              Reset to Defaults
            </button>
          </div>
        </details>
      </main>

      {/* Footer */}
      <footer className='mt-4 text-right'>
        <a href='https://emailmarkup.org/' target='_blank' rel='noopener noreferrer' className='text-xs text-gray-500 hover:text-gray-700 hover:underline'>
          Email Markup Consortium
        </a>
      </footer>
    </div>
  )
}
