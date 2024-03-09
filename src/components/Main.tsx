import { useEffect, useState } from 'react'
import disableReaderView from '../utils/disableReaderView'
import enableReaderView from '../utils/enableReaderView'
import { type Profile, type Setting, initialProfiles, initialSettings } from '../utils/initialProfileSettings'
import { Box, Button, Checkbox, Collapse, Flex, FormControl, FormLabel, Input, Select, Slider, SliderFilledTrack, SliderThumb, SliderTrack, Stack, Tab, TabList, TabPanel, TabPanels, Tabs, Text } from '@chakra-ui/react'

let localProfile = localStorage.getItem('currentProfile') || 'A'
let localProfiles = JSON.parse(localStorage.getItem('localProfiles') || JSON.stringify(initialProfiles))
let localSettings = JSON.parse(localStorage.getItem('localSettings') || JSON.stringify(initialSettings))
let toggleButtonLocal = JSON.parse(localStorage.getItem('toggleButton') || 'false')

const Main = () => {
  // const [currentProfile, setCurrentProfile] = useState(localProfile)
  const [currentProfile] = useState(localProfile)
  const [profiles, setProfiles] = useState<Profile[]>(localProfiles)
  const [toggleButton, setToggleButton] = useState(toggleButtonLocal)
  const [settings, setSettings] = useState<Setting>(localSettings)

  const [isOpen, setIsOpen] = useState(false)
  const toggleContent = () => setIsOpen(!isOpen)

  const toggleReaderView = async (toggleButton: boolean, profiles: Profile[], settings: Setting, currentProfile: string) => {
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
            return (
              <Tab flex={1} key={id}>
                {name}
              </Tab>
            )
          })}
        </TabList>
        {/* {currentProfile} */}
        <TabPanels>
          {profiles.map(({ name }, index) => {
            return (
              <>
                <TabPanel key={index}>
                  <Flex>
                    <Text flex={3} key={index} p={4}>
                      Name:
                    </Text>
                    <Input
                      id={name}
                      flex={2}
                      variant='outline'
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
                  </Flex>
                  <Flex>
                    <Text flex={3} key={index} p={4}>
                      Background:
                    </Text>
                    <Input
                      flex={2}
                      variant='outline'
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
                  </Flex>
                  <Flex>
                    <Text flex={3} key={index} p={4}>
                      Text:
                    </Text>
                    <Input
                      flex={2}
                      variant='outline'
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
                  </Flex>
                  <Flex>
                    <Text flex={3} key={index} p={4}>
                      Links:
                    </Text>
                    <Input
                      flex={2}
                      variant='outline'
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
                  </Flex>
                </TabPanel>
              </>
            )
          })}
        </TabPanels>
      </Tabs>

      <Button onClick={toggleContent} width='100%' textAlign='left'>
        {isOpen ? 'Hide Settings' : 'Show Settings'}
      </Button>
      <Collapse in={isOpen}>
        <Box padding='3'>
          <Stack spacing={4}>
            <FormControl>
              <Flex>
                <FormLabel flex={1} htmlFor='width'>
                  Width
                </FormLabel>
                <Slider
                  flex={1}
                  id='width'
                  aria-label='Width'
                  min={20}
                  max={70}
                  step={0.5}
                  value={settings.maxWidth}
                  colorScheme='teal'
                  onChange={(value) => {
                    setSettings({ ...settings, maxWidth: value })
                  }}
                >
                  <SliderTrack>
                    <SliderFilledTrack />
                  </SliderTrack>
                  <SliderThumb />
                </Slider>
              </Flex>
            </FormControl>

            <FormControl>
              <Flex>
                <FormLabel flex={1} htmlFor='fontFamily'>
                  Font family
                </FormLabel>
                <Select
                  flex={1}
                  placeholder='Select option'
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
                </Select>
              </Flex>
            </FormControl>

            <FormControl>
              <Flex>
                <FormLabel flex={1} htmlFor='fontSize'>
                  Font size
                </FormLabel>
                <Slider
                  flex={1}
                  id='fontSize'
                  aria-label='font size'
                  min={0.5}
                  max={3}
                  step={0.25}
                  value={settings.fontSize}
                  colorScheme='teal'
                  onChange={(value) => {
                    setSettings({ ...settings, fontSize: value })
                  }}
                >
                  <SliderTrack>
                    <SliderFilledTrack />
                  </SliderTrack>
                  <SliderThumb />
                </Slider>
              </Flex>
            </FormControl>

            <FormControl>
              <Flex>
                <FormLabel flex={1} htmlFor='lineHeight'>
                  Line height
                </FormLabel>
                <Slider
                  flex={1}
                  id='lineHeight'
                  aria-label='line height'
                  min={1}
                  max={2}
                  step={0.1}
                  value={settings.lineHeight}
                  colorScheme='teal'
                  onChange={(value) => {
                    setSettings({ ...settings, lineHeight: value })
                  }}
                >
                  <SliderTrack>
                    <SliderFilledTrack />
                  </SliderTrack>
                  <SliderThumb />
                </Slider>
              </Flex>
            </FormControl>

            <FormControl>
              <Flex>
                <FormLabel flex={1} htmlFor='wordSpacing'>
                  Word spacing
                </FormLabel>
                <Slider
                  flex={1}
                  id='wordSpacing'
                  aria-label='word spacing'
                  min={0}
                  max={1}
                  step={0.1}
                  value={settings.wordSpacing}
                  colorScheme='teal'
                  onChange={(value) => {
                    setSettings({ ...settings, wordSpacing: value })
                  }}
                >
                  <SliderTrack>
                    <SliderFilledTrack />
                  </SliderTrack>
                  <SliderThumb />
                </Slider>
              </Flex>
            </FormControl>

            <FormControl>
              <Flex>
                <FormLabel flex={1} htmlFor='letterSpacing'>
                  Letter spacing
                </FormLabel>
                <Slider
                  flex={1}
                  id='letterSpacing'
                  aria-label='letter spacing'
                  min={0}
                  max={0.3}
                  step={0.02}
                  value={settings.letterSpacing}
                  colorScheme='teal'
                  onChange={(value) => {
                    setSettings({ ...settings, letterSpacing: value })
                  }}
                >
                  <SliderTrack>
                    <SliderFilledTrack />
                  </SliderTrack>
                  <SliderThumb />
                </Slider>
              </Flex>
            </FormControl>

            <FormControl>
              <Flex>
                <FormLabel flex={1} htmlFor='blockImages'>
                  Block images
                </FormLabel>
                <Checkbox
                  flex={1}
                  id='blockImages'
                  aria-label='block images'
                  size='md'
                  colorScheme='orange'
                  isChecked={settings.blockImages}
                  onChange={(e) => {
                    setSettings({ ...settings, blockImages: e.target.checked })
                  }}
                ></Checkbox>
              </Flex>
            </FormControl>
          </Stack>
        </Box>
        <Box marginY={1}>
          <Button
            type='button'
            colorScheme='teal'
            onClick={() => {
              setSettings(initialSettings)
            }}
          >
            Reset Settings
          </Button>

          <Button
            type='button'
            variant='outline'
            onClick={() => {
              setProfiles(initialProfiles)
            }}
          >
            Reset Profiles
          </Button>
        </Box>
      </Collapse>
    </>
  )
}

export default Main
