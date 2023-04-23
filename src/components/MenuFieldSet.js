import React from 'react'
import profiles from '../utils/profiles'

const MenuFieldset = ({ currentProfile, setCurrentProfile }) => {
  return (
    <>
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
                      localStorage.setItem('currentProfile', e.target.value)
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
    </>
  )
}
export default MenuFieldset
