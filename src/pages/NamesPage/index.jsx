import React, { useState } from 'react'
import './index.scss'
import PageControl from '../../assets/components/PageControl';
import NamesList from '../../assets/components/section/NamesList';
import { useQuery } from 'react-query';
import { fetchCurrencyRates, getNames } from '../../boot/axios';
import { NAMES } from '../../boot/useApi';
import HomeSpinner from '../../assets/components/section/Spinner/HomeSpinner';
import { useEffect } from 'react';
import Title from '../../assets/components/Title';

function Names() {
  const [select,setSelect]=useState(false);
  const [disabled,setDisabled]=useState(false)
  const {data,isLoading,refetch,error}=useQuery('names',()=> getNames(NAMES.names));
  const likedNames=data?.filter((element)=>element.isLiked=="true");
   useEffect(()=>{
     if (likedNames?.length==0) {
      setSelect(false)
      setDisabled(true)
     }
     else{
      setDisabled(false)
     }
   },[likedNames]);
   useEffect(() => {
    document.title = `Hamroh | Alloh ismlari`;
    const fetchData = async () => {
      try {
       
      } catch (err) {
        console.log(err);
      }
    };

    fetchData();
   }, []);
  
        return (
        <div   className="names">
          <div  className="names__container container">
             <div className="names__header">
              <PageControl next="/qur'on"/>
              <Title text={select?"Tanlanganlar":"Asmo al-Husna"}/>
              <button disabled={disabled} onClick={()=>setSelect(!select)} className={select?'names__page-button  names__page-button--active':'names__page-button'}><span>Tanlanganlar</span></button>
             </div>
             <div className="names__body">
                {
                  isLoading?<HomeSpinner />:<NamesList refetch={refetch} data={select?likedNames:data} />
                }
             </div>
          </div>
        </div>
        );
    
}

export default Names
