import React, { useEffect, useState } from 'react'
import PageControl from '../../assets/components/PageControl'
import './index.scss'
import SearchInput from '../../assets/components/SearchInput'
import Title from '../../assets/components/Title'
import SurahList from '../../assets/components/section/SurahList'
import { useQuery } from 'react-query'
import { getSurahs } from '../../boot/axios'
import { BOOK } from '../../boot/useApi'
import HomeSpinner from '../../assets/components/section/Spinner/HomeSpinner'
import { residualSurahs } from '../../boot/functions'

function Book() {
const [surahs,setSurahs]=useState([])
const {data,isLoading}=useQuery("surahs",()=> getSurahs(BOOK.surahs))

useEffect(()=>{
if (!isLoading) {
    setSurahs(data.concat(residualSurahs))
}
},[data])

    return (
     <div className="book">
        <div className="book__container container">
         <div className="book__header">
         <PageControl next="/zikr"/>
            <Title text="Suralar"/>
            <SearchInput maxWidth={150} placeholder='Suralarni qidirish' type="search"/>
         </div>
         <div className="book__body">
           {isLoading?<HomeSpinner/>:<SurahList data={surahs}/>}
         </div>
        </div>
     </div>
    )
}

export default Book
