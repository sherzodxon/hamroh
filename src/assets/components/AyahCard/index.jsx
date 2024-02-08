import React, {
    useState
} from 'react';
import './index.scss'
import { playAyah } from '../../../features/ayahs/ayahsSlice';
import { useDispatch } from 'react-redux';
import Player from '../AudioPlayer';


function AyahCard({
    number,
    textUzb,
    textArab,
    playing,
    numberOfAyahs
}) {
    
    return (
        <li className='oyat-card'>
            <Player audioUrl={(id)=>`https://cdn.islamic.network/quran/audio/128/ar.alafasy/${id}.mp3`} number={number}  numberOfAyahs={numberOfAyahs} isPlaying={playing}/>
             <div className="oyat-card__wrapper">
                <p className='oyat-card__number'>{number}</p>
                 <p className='oyat-card__text arabic-text'>{textArab}</p>
             </div> 

             <p className='oyat-card__text'>{textUzb}</p>
        </li>
    )
}

export default AyahCard