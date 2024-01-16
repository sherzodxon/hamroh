import React from 'react'
import './index.scss'
import { useCurrentZone } from '../../../contexts/context'
function Header() {
 const {currentZone}=useCurrentZone()

    return (
        <div className="header">
          {/* <a href="/" className="header-logo-link"><img src={require("../../../assets/img/header-logo.png")} alt="logo" width="54" height="65" className="header-logo" /></a> */}
          <p className={`header-locality `}>{currentZone.city || currentZone.state}</p>
        </div>
    )
}

export default Header
