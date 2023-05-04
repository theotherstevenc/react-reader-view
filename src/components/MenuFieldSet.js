import React from 'react'

const MenuFieldset = ({ profile, currentProfile, setCurrentProfile }) => {
  return (
    <>
      <menu role='menubar' className='profiles'>
        <fieldset className='profiles'>
          <legend>Profile</legend>
          <div>
            {profile.map(({ id, profile, name }) => {
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
    </>
  )
}
export default MenuFieldset
