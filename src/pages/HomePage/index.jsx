import React, { useEffect, useState } from 'react'
import { getTimings } from '../../boot/axios'
import { useQuery } from 'react-query';

function HomePage() {
    const [field,setField]=useState("Tashkent?Uzbekistan")
    const {data,isLoading}=useQuery(field, ()=>getTimings(field))

    return (
        <>
        <div className="">Home</div>
        {isLoading?<p>Loadinf...</p>:data.map(el=><p key={el.id}>{`${el.name}-${el.time}`}</p>)}
        <button onClick={()=>setField("Moscow,Russia")}>lala</button>
        </>
    )
}

export default HomePage
