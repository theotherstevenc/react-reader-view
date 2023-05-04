import React from 'react'

const ProfileFieldset = ({ currentProfile, profile, setProfile }) => {
  return (
    <>
      {profile.map(({ id }, index) => {
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
                    value={profile[index].name}
                    onChange={(e) => {
                      setProfile((prevProfiles) => {
                        const newProfiles = [...prevProfiles]
                        newProfiles[index].name = e.target.value
                        return newProfiles
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
                    value={profile[index].backgroundColor}
                    onChange={(e) => {
                      setProfile((prevProfiles) => {
                        const newProfiles = [...prevProfiles]
                        newProfiles[index].backgroundColor = e.target.value
                        return newProfiles
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
                    value={profile[index].color}
                    onChange={(e) => {
                      setProfile((prevProfiles) => {
                        const newProfiles = [...prevProfiles]
                        newProfiles[index].color = e.target.value
                        return newProfiles
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
                    value={profile[index].linkColor}
                    onChange={(e) => {
                      setProfile((prevProfiles) => {
                        const newProfiles = [...prevProfiles]
                        newProfiles[index].linkColor = e.target.value
                        return newProfiles
                      })
                    }}
                  />
                </span>
              </label>
            </div>
          </fieldset>
        )
      })}
    </>
  )
}
export default ProfileFieldset
