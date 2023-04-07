import React from 'react'

const Fieldset = ({ profile, setProfile, assignedProfile, fieldsetDataProfiles }) => {
  return (
    <fieldset className={profile.currentProfile === assignedProfile ? 'display-profile' : ''} hidden>
      <legend>{profile[`profile` + assignedProfile + `_name`]} settings</legend>
      <div className='selectStyles'>
        {fieldsetDataProfiles(assignedProfile).map((el) => (
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
