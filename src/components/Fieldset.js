import React from 'react'

const Fieldset = ({ profile, setProfile, currentProfile, fieldsetDataProfiles }) => {
  return (
    <fieldset className={profile.currentProfile === currentProfile ? 'display-profile' : ''} hidden>
      <legend>{profile[`profile` + currentProfile + `_name`]} settings</legend>
      <div className='selectStyles'>
        {fieldsetDataProfiles.map((el) => (
          <label key={el.id}>
            <span>{el.title}</span>
            <span>
              <input
                type={el.type}
                name={el.name}
                id={el.id}
                value={profile[el.value]}
                onChange={(e) => {
                  setProfile({
                    ...profile,
                    [el.value]: e.target.value,
                  })
                }}
              />
            </span>
          </label>
        ))}
      </div>
    </fieldset>
  )
}

export default Fieldset
