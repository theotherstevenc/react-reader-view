import EMClogo from '../img/emc-logo.svg'
import EMClogoW from '../img/emc-logo-w.svg'

const Footer = () => {
  return (
    <p className='emc-credit'>
      <a href='https://emailmarkup.org/' target='_blank'>
        <picture>
          <source srcSet={EMClogoW} media='(prefers-color-scheme: dark)' />
          <img src={EMClogo} alt='Email Markup Consortium' />
        </picture>
      </a>
    </p>
  )
}

export default Footer
