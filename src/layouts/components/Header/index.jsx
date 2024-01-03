import React from 'react'
import './index.scss'
function Header() {
    return (
        <div className="header">
          <a href="/" className="header-logo-link"><img src={require("../../../assets/img/header-logo.png")} alt="logo" width="67" height="80" className="header-logo" /></a>
          <p className={`header-locality `}>oltinchi pol</p>
        </div>
    )
}

export default Header
