import React, { useContext, useEffect, useRef } from "react";
import play from '../../img/pause-white.svg';
import pause from '../../img/play-white.svg';
import close from '../../img/x-lg.svg'
import { useSelector, useDispatch } from "react-redux";
import "./index.scss"
import {
   closeAudioPlayer,
   currentPlayingAudio as currentPlayingAudioAction,
   startPlaying,
   stopPlaying,
   setPlaylist,
} from "../../../features/ayahs/audioSlice";
import { PlaylistsContext } from "../../../contexts/audioContext";

const AudioPlayer = () => {
   const { playlist } = useContext(PlaylistsContext);
   const dispatch = useDispatch();

   const {
      isOpenAudioPlayer: isOpen,
      currentPlayingAudio,
      isPlaying,
      currentPlayList,
   } = useSelector((state) => state.audio);
   let currAudio = useRef();



   useEffect(() => {
      if (isPlaying) {
         currAudio.current.play();
      }
      if (!currAudio.current.ended && !isPlaying) {
         currAudio.current.pause();
      }
      currAudio.current.onended = () => {
         if (currentPlayingAudio.ayahNumber < currentPlayList.length) {
            const { audio: url } =
               currentPlayList[currentPlayingAudio.ayahNumber];
            dispatch(
               currentPlayingAudioAction({
                  audioUrl: url,
                  ayahName: currentPlayingAudio.ayahName,
                  surahNumber: currentPlayingAudio.surahNumber,
                  ayahNumber: currentPlayingAudio.ayahNumber + 1,
               })
            );
            return dispatch(setPlaylist(playlist));
         }
         dispatch(currentPlayingAudioAction({}));
         dispatch(stopPlaying());
         dispatch(closeAudioPlayer());
      };
   }, [currentPlayingAudio, isPlaying]);

   return (
      <div
         className={isOpen?"audio":"audio--closed"}
      >
         <div className="audio__wrapper">
            <div className="audio__inner">
               <div className="audio__info">
                  <button
                     onClick={() => {
                        if (currAudio.current.paused) {
                           currAudio.current.play();
                           dispatch(startPlaying());
                        } else {
                           currAudio.current.pause();
                           dispatch(stopPlaying());
                        }
                     }}
                     className="audio__button"
                  >
                     <img
                        src={
                           isPlaying
                              ?play
                              : pause
                        }
                        alt="sd"
                     />
                  </button>
                  <p className="audio__ayahname">
                     {currentPlayingAudio.ayahName}
                  </p>{" "}
                  {/* &nbsp; -- &nbsp; */}
                  <span className="audio__span">
                     [ {currentPlayingAudio.surahNumber} :{" "}
                     {currentPlayingAudio.ayahNumber} ]
                  </span>
               </div>
               <audio src={currentPlayingAudio.url} ref={currAudio}></audio>
               <button
                  onClick={() => {
                     dispatch(stopPlaying());
                     dispatch(closeAudioPlayer());
                  }}
                  className="audio__close-btn"
               >
                  <img src={close} alt="" />
               </button>
            </div>
         </div>
      </div>
   );
};

export default AudioPlayer;
