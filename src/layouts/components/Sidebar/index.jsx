import React, { useEffect, useState } from 'react'
import { sidebarRoutes } from './sidebarRoutes'
import { Link, useLocation } from 'react-router-dom'
import "./index.scss"

function Sidebar() {
const [checked,setchecked]=useState(false);
let location = useLocation();

useEffect(()=>{
sidebarRoutes.forEach((el)=>{
if (el.to==location.pathname) {
el.active=true
}
else
el.active=false
setchecked(!checked)
})
},[location])

return (
<section className='sidebar'>
    <div id="nav-bar">
        <input className='nav-toggle' id="nav-toggle" type="checkbox" />
        <div id="nav-header">
            <a className="nav-title" href="/" target="_blank">HAMROH</a>
            <label htmlFor="nav-toggle"><span id="nav-toggle-burger"></span></label>
        </div>
        <ul className='nav-list'>
            {sidebarRoutes.map(element=>
            <li key={element.id} className='nav-item'>
                <Link to={element.to} className={element.active?'nav-item-link--active':'nav-item-link'}>
                <img width={40} height={40} className='nav-item-image' src={element.image} alt="name" />
                <span className='nav-span'>{element.title}</span>
                </Link>
            </li>
            )}

        </ul>
        <div id="nav-footer">
            <div id="nav-footer-heading">
                <div id="nav-footer-avatar"><img src={require("../../../assets/img/98073602.jpg")} />
                </div>
                <div id="nav-footer-titlebox"><a id="nav-footer-title" href="https://github.com/sherzodxon"
                        target="_blank">sherzodxon</a><span id="nav-footer-subtitle">Admin</span>
                </div>
            </div>
            
        </div>
    </div>
</section>

)
}

export default Sidebar