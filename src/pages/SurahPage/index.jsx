import React from 'react'
import { useEffect } from 'react';
import { useParams } from 'react-router-dom'
import { SURAH } from '../../boot/useApi';
import { oneSurah } from '../../boot/axios';
import { useState } from 'react';
import OyatList from '../../assets/components/section/OyatList';
import HomeSpinner from '../../assets/components/section/Spinner/HomeSpinner';

function SurahPage() {
    const [data,setData]=useState([]);
    const [isLoading,setLoading]=useState(true)
    const {id}=useParams();
   
  useEffect(()=>{
    (async () => {
       setData(await oneSurah(SURAH.one_surah(id),id));
   })()

  },[id]);
useEffect(()=>{
    if (data && data.length!=0) {
        setLoading(false)
        console.log(data);
       }
},[data])

    return (
       <div className="surah">
        <div className="surah__container container">
           {
             isLoading?<HomeSpinner/>:<OyatList data={data}/>
           }
        </div>
       </div>
    )
}

export default SurahPage
