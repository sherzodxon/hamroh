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
            <ul className='sidebar__list'>
           {sidebarRoutes.map(({id,to,title,active})=>( 
           <li key={id} className="sidebar__item">
             <Link  style={active?{ background: "#009959"}:{   background: "#020202"}} className='sidebar__link'  to={to}>{title}</Link>
           </li>
           ))}
        </ul></section>
    
    )
}

export default Sidebar
