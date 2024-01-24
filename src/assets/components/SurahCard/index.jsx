import React from 'react';
import './index.scss'
import { Link } from 'react-router-dom';

function SurahCard({number=1,textUzb,textArab,}) {
    return (
        <li className='surah-card'>
             <div className="surah-card__leftbox">
                <div className="surah-card__number-wrapper">
                <p className='surah-card__number'>{number}</p>
                </div>
              <p className='surah-card__name'>{textUzb}</p>
             </div>
              <Link to={`/suralar/${number}`} className='surah-card__link'/>
              <p className='surah-card__name arabic-name'>{textArab}</p>
        </li>
    )
}

export default SurahCard
