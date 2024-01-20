import React from 'react'
import { useQuery } from 'react-query'
import { useParams } from 'react-router-dom'
import { getNames } from '../../boot/axios'
import { NAMES } from '../../boot/useApi'
import HomeSpinner from '../../assets/components/section/Spinner/HomeSpinner'
import PageControl from '../../assets/components/PageControl'
import './index.scss'
import { useState } from 'react'
import { useEffect } from 'react'

function NamePage() {
    const {id}=useParams()
    const [data,setData]=useState(null);
  // const {data,isLoading}=useQuery("name",()=>getNames(NAMES.one_name(id)))
  useEffect(()=>{
        (async () => {
            setData(await getNames(NAMES.one_name(id)))
       })()
  },[id])
    return (
<div className="name">
    <div className="name__container container">
        <div className="name__header">
            <PageControl next="/ismlar"/>
        </div>
        {
            data? <div className="name__body">
            <h2 className='name__title'>{data.name}</h2>
            <p className='name__text'>{data.comment}</p>
        </div>:<HomeSpinner/>
        }
    </div>
</div>
    )
}

export default NamePage
