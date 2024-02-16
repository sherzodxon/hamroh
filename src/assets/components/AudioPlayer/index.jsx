import React, { useContext, useEffect, useRef } from "react";
import play from '../../img/play.svg';
import pause from '../../img/pause.svg'
import { useSelector, useDispatch } from "react-redux";
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

   // const refAudio = useRef(currAudio);

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
         style={{ display: isOpen ? "block" : "none" }}
         className={`styles.wrapper`}
      >
         <div className="container">
            <div className={`styles.inner`}>
               <div>
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
                     className={`styles.playBtn`}
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
                  <p className={`styles.ayahName`}>
                     {currentPlayingAudio.ayahName}
                  </p>{" "}
                  &nbsp; -- &nbsp;
                  <span>
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
                  className={`styles.closeBtn`}
               >
                  <img src="/images/closeIcon.svg" alt="" />
               </button>
            </div>
         </div>
      </div>
   );
};

export default AudioPlayer;
