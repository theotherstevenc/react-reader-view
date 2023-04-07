import React, { Fragment } from 'react'

const ProfileButtons = ({ profile, setProfile, profileButtonDataProperties }) => {
  return (
    <div>
      {profileButtonDataProperties.map((el) => (
        <Fragment key={el.id}>
          <input
            type='radio'
            name='readerviewProfile'
            id={el.id}
            value={el.value}
            checked={profile.currentProfile === el.profile}
            onChange={(e) => {
              setProfile({
                ...profile,
                currentProfile: e.target.value,
              })
            }}
          />
          <label className='button' id={el.id + `Label`} htmlFor={el.id} style={{ backgroundColor: [el.styles.backgroundColor], color: [el.styles.color] }}>
            {profile[`profile` + el.profile + `_name`]}
          </label>
        </Fragment>
      ))}
    </div>
  )
}

export default ProfileButtons
