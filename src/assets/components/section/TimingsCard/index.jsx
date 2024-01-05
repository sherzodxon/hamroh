import React from 'react'

import './index.scss'

function TimingsCard({time,name,className}) {
    return (
        <li className={`timings__item ${className}`}>
            <p className='timings__item-name'>{name}</p>
            <p className='timings__item-time'>{time}</p>
        </li>
    )
}

export default TimingsCard
