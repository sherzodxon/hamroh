import React from 'react';
import './index.scss'
import play from '../../img/play.svg';
import pause from '../../img/pause.svg'
import { useDispatch, useSelector } from 'react-redux';
import {
    currentPlayingAudio,
    openAudioPlayer,
    startPlaying,
    stopPlaying,
 } from "../../../features/ayahs/audioSlice";

function AyahCard({
    transText,
    arabicText,
    number,
    setPlaylist,
    audioUrl,
    ayahName,
    surahNumber,
}) {
    const dispatch = useDispatch();
    const { isPlaying, currentPlayingAudio: currentAudio } = useSelector(
        (state) => state.audio
     );
     const isCurrPlaying = isPlaying && currentAudio.url === audioUrl;
    return (
        <li className='oyat-card'>
            <button
               onClick={() => {
                  if (!isPlaying) {
                     setPlaylist();
                     dispatch(openAudioPlayer());
                     dispatch(
                        currentPlayingAudio({
                           audioUrl,
                           ayahName,
                           surahNumber,
                           ayahNumber: number,
                        })
                     );
                     dispatch(startPlaying());
                  } else {
                     if (currentAudio.url === audioUrl) {
                        return dispatch(stopPlaying());
                     }
                     dispatch(
                        currentPlayingAudio({
                           audioUrl,
                           ayahName,
                           surahNumber,
                           ayahNumber: number,
                        })
                     );
                     setPlaylist();
                  }
               }}
               className={`styles.playBtn`}
            >
               <img
                  src={
                     isCurrPlaying
                        ? play
                        : pause
                  }
                  alt="sdds"
               />
            </button>
             <div className="oyat-card__wrapper">
                <p className='oyat-card__number'>{number}</p>
                 <p className='oyat-card__text arabic-text'>{arabicText}</p>
             </div> 

             <p className='oyat-card__text'>{transText}</p>
        </li>
    )
}

export default AyahCard