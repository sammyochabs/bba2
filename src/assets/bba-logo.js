import React from 'react'
import Logo from './images/bba-logo.png'

const BbaLogo = ({ size }) => {
  return (
    <div className="logo-wrapper">
      <img
        src={Logo}
        alt="Bangladesh bridge authority logo."
        className="bba-logo"
        width={`${size}px`}
      />
    </div>
  )
}

export default BbaLogo
