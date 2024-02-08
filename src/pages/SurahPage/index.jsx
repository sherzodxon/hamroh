import React from 'react'
import { useEffect } from 'react';
import { useParams } from 'react-router-dom'
import { SURAH } from '../../boot/useApi';
import { oneSurah } from '../../boot/axios';
import { useState } from 'react';
import AyahList from '../../assets/components/section/AyahList';
import HomeSpinner from '../../assets/components/section/Spinner/HomeSpinner';

function SurahPage() {
//     const [data,setData]=useState([]);
//     const [isLoading,setLoading]=useState(true)
//     const {id}=useParams();
   
//   useEffect(()=>{
//     (async () => {
//        setData(await oneSurah(SURAH.one_surah(id),id));
//    })()

//   },[id]);
// useEffect(()=>{
//     if (data && data.length!=0) {
//         setLoading(false)
//        }
// },[data])

    return (
       <div className="surah">
        <div className="surah__container container">
             <AyahList />
        </div>
       </div>
    )
}

export default SurahPage
