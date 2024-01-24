import React from 'react'
import './index.scss'

function OyatCard({number,textUzb,textArab}) {
    return (
        <li className='oyat-card'>
             <div className="oyat-card__wrapper">
                <p className='oyat-card__number'>{number}</p>
                 <p className='oyat-card__text arabic-text'>{textArab}</p>
             </div> 
             <p className='oyat-card__text'>{textUzb}</p>
        </li>
    )
}

export default OyatCard
