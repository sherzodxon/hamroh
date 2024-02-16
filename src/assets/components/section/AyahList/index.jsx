import React, { useContext, useEffect } from 'react'
import AyahCard from '../../AyahCard';
import PageControl from '../../PageControl';
import { useDispatch, useSelector } from 'react-redux';
import HomeSpinner from '../Spinner/HomeSpinner';
import { useParams } from 'react-router-dom';
import { setPlaylist } from "../../../../features/ayahs/audioSlice";
import { PlaylistsContext } from "../../../../contexts/audioContext";
import { useState } from 'react';
import axios from 'axios';
import AudioPlayer from '../../AudioPlayer';

function AyahList() {
  const dispatch = useDispatch();

  const [audios, setAudios] = useState([]);
  const [transTexts, setTransTexts] = useState({});
  const [arabicTexts, setArabicTexts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const { setCurrentPlaylistContext } = useContext(PlaylistsContext);
   const {id}=useParams();

   const getAllData = () => {
   const arabicText = axios.get(`https://api.alquran.cloud/v1/surah/${id}`);
   const arabicAudio = axios.get(`https://api.alquran.cloud/v1/surah/${id}/ar.alafasy`);
   const transText = axios.get(`https://api.alquran.cloud/v1/surah/${id}/uz.sodik`);
   setIsLoading(true);
   axios
   .all([transText, arabicText, arabicAudio])
   .then(
      axios.spread(
         ({ data: data1 }, { data: data2 }, { data: data3 }) => {
            setTransTexts(data1.data);
            setArabicTexts(data2.data.ayahs);
            setAudios(data3.data.ayahs);
         }
      )
   )
   .finally(() => {
      setIsLoading(false);
   });
   }
  useEffect(() => {
    //dispatch(fetchAyahs(id));
    getAllData()
  }, []);

  // if (status === 'loading') {
  //   return <HomeSpinner/>;
  // }

  // if (status === 'failed') {
  //   return <div>Error: {error}</div>;
  // }

    return (
       <div className="oyat-list">
       <PageControl next="/zikr"/>
       <AudioPlayer/>
         <ul className='oyat-list__list'>
           {
            isLoading?<HomeSpinner/>: transTexts.ayahs?.map((item,index)=><AyahCard  transText={item.text}
              arabicText={arabicTexts[index].text}
              number={item.numberInSurah}
              key={item.numberInSurah}
              setPlaylist={() => {
                 setCurrentPlaylistContext(audios);
                 dispatch(setPlaylist(audios));
              }}
              audioUrl={audios[item.numberInSurah - 1].audio}
              ayahName={transTexts.englishName}
              surahNumber={transTexts.number}
            />)
           }
        </ul>
       </div>
    )
}

export default AyahList
