import {
  useState,
  useEffect
} from 'react';
import {
  useDispatch,
  useSelector
} from 'react-redux';
import {
  pauseAyah,
  playAyah
} from '../../../features/ayahs/ayahsSlice';


const Audios = (audioUrl, number, isPlaying, numberOfAyahs) => {

  const dispatch = useDispatch();
  const posts = useSelector((state) => state.ayahs.data);
  let [playing, setPlaying] = useState(isPlaying);
  const [curNumber, setCurNumber] = useState(number);
  
//console.log(curNumber);

  function onEnded() {
    dispatch(pauseAyah(number))
    if (curNumber < numberOfAyahs) {
     
      setCurNumber(number+1)
       dispatch(playAyah(curNumber));
    }else{
      setCurNumber(number)
    }

  }

  function toggle() {

  //setCurNumber(number)
    isPlaying ? dispatch(pauseAyah(curNumber)) : dispatch(playAyah(curNumber));
    //  isPlaying ? audio.play() : audio.pause();
  
  };
  // useEffect(() => {
  //   toggle()
  // }, [curNumber])
  useEffect(() => {
    if (isPlaying) {
      const audio = new Audio(audioUrl(number));
      isPlaying ? audio.play() : audio.pause()
      audio.addEventListener('ended', onEnded);
    }
  }, [isPlaying]);

  return [toggle];
};

const Player = ({
  audioUrl,
  number,
  isPlaying,
  numberOfAyahs
}) => {
  const [toggle] = Audios(audioUrl, number, isPlaying, numberOfAyahs);

  return (
    <div className='audio'>
      <button onClick={toggle} className={isPlaying  ? "audio-button-play" : "audio-button-pause"}>{isPlaying?"play":"pause"}</button>
    </div>
  )   
}
export default Player