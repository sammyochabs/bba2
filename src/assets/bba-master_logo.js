import { width } from 'dom-helpers'
import React from 'react'
import Logo from './images/bba-logo.png'
import logoLeft from './images/bba_logo_left.png'
import logoRight from './images/bba_logo_right.png'
const BbaMasterLogo = ({ size }) => {
  return (
    <div className="logo-wrapper">
      <div className="row">
        <div className="column">
          <img
            src={logoLeft}
            alt="Bangladesh bridge authority logo."
            className="bba-logo_left"
            width={`${size}px`}
          />
        </div>

        <div className="column">
          <img
            src={Logo}
            alt="Bangladesh bridge authority logo."
            className="bba-master_logo"
            width={`${size}px`}
          />
        </div>

        <div className="column">
          <img
            src={logoRight}
            alt="Bangladesh bridge authority logo."
            className="bba-logo_right"
            width={`${size}px`}
          />
        </div>
      </div>
    </div>
  )
}

export default BbaMasterLogo
