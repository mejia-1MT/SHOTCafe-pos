import PropTypes from 'prop-types'

function IconLabels({ Image, Label }) {
  return (
    <a className="m-nav-labeled-icon">
      <Image className="m-nav-icon" />
      <p className={'m-nav-label'}>{Label}</p>
    </a>
  )
}

export default IconLabels
