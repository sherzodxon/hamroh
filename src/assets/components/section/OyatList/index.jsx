import React from 'react'
import OyatCard from '../../OyatCard';
import PageControl from '../../PageControl'

function OyatList({data}) {
    return (
       <div className="oyat-list">
       <PageControl next="/zikr"/>
         <ul className='oyat-list__list'>
           {
             data.map(el=><OyatCard key={el.id} number={el.id} textArab={el.textArabic} textUzb={el.textUzb}/>)
           }
        </ul>
       </div>
    )
}

export default OyatList
