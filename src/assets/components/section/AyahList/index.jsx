import React, { useContext, useEffect } from 'react'
import AyahCard from '../../AyahCard';
import PageControl from '../../PageControl';
import { useDispatch } from 'react-redux';
import HomeSpinner from '../Spinner/HomeSpinner';
import { useParams } from 'react-router-dom';
import { setPlaylist } from "../../../../features/ayahs/audioSlice";
import { PlaylistsContext } from "../../../../contexts/audioContext";
import { useState } from 'react';
import axios from 'axios';
import {qoranList} from '../../../../boot/qoranList'
import ErrorSection from '../Error';
import './index.scss'

function AyahList() {
  const dispatch = useDispatch();

  const [audios, setAudios] = useState([]);
  const [editionTexts, setEditionTexts] = useState({});
  const [arabicTexts, setArabicTexts] = useState([]);
  const [error,setError]=useState(false)
  const [isLoading, setIsLoading] = useState(true);
 
  const { setCurrentPlaylistContext } = useContext(PlaylistsContext);
   const {id}=useParams();

   const getAllData = () => {
   const arabicText = axios.get(`https://api.alquran.cloud/v1/surah/${id}`);
   const arabicAudio = axios.get(`https://api.alquran.cloud/v1/surah/${id}/ar.alafasy`);
   const editionText = axios.get(`https://api.alquran.cloud/v1/surah/${id}/uz.sodik`);
   ///const uzbName=axios.get(`https://retoolapi.dev/OS6065/quronsuralar/${id}`);

   setIsLoading(true);
   axios
   .all([editionText, arabicText, arabicAudio])
   .then(
      axios.spread(
         ({ data: data1 }, { data: data2 }, { data: data3 }) => {
            setEditionTexts({
               ...data1.data,
               nameUz:qoranList[id - 1].nameUz
            });
            setArabicTexts(data2.data.ayahs);
            setAudios(data3.data.ayahs);
         }
      )
   )
   .catch(()=>{
      setError(true)
   })
   .finally(() => {
      setIsLoading(false);
   
   });
   }
  useEffect(() => {
    //dispatch(fetchAyahs(id));
    getAllData()
  }, []);

  console.log(editionTexts);

  if (error) {
    return <ErrorSection/>;
  }
  
    return (
       <div className="oyat-list">
       <PageControl next="/zikr"/>
         <h3 className='oyat-list__name'>{editionTexts.nameUz}</h3>
         <ul className='oyat-list__list'>
           {
            isLoading?<HomeSpinner/>: editionTexts.ayahs?.map((item,index)=><AyahCard  transText={item.text}
              arabicText={arabicTexts[index].text}
              number={item.numberInSurah}
              key={item.numberInSurah}
              setPlaylist={() => {
                 setCurrentPlaylistContext(audios);
                 dispatch(setPlaylist(audios));
              }}
              audioUrl={audios[item.numberInSurah - 1].audio}
              ayahName={editionTexts.nameUz}
              surahNumber={editionTexts.number}
            />)
           }
        </ul>
       </div>
    )
}

export default AyahList
