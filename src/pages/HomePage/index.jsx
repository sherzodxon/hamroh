import React, { useEffect, useState } from 'react'
import { getCurrentTime, getTimings } from '../../boot/axios'
import { useQuery } from 'react-query';
import Timings from '../../assets/components/Timings';

const date =new Date();
let minutes= date.getMinutes()
if (minutes/10 < 1) {
    minutes=`0${minutes}`
}
let hours= date.getHours();
if (hours/10 < 1) {
    hours=`0${hours}`
}

function HomePage() {
    const [field,setField]=useState("Tashkent?Uzbekistan");
    const [prayerTime,setPrayerTime]=useState("- - - -")
    const {data,isLoading,isError}=useQuery(field, ()=>getTimings(field));

    const [time,setTime]=useState(`${hours}:${minutes}`);
   
function currentTimeClass(params) {
   
    if (time >=  params[0].time&& time <= params[1].time) {
        setPrayerTime("bomdod")
     }
     else if (time>=params[1].time&& time<=params[2].time) {
        setPrayerTime("quyosh")
     }
     else if (time>=params[2].time&& time <=params[3].time) {
      setPrayerTime("peshin")
     }
     else if (time >=params[3].time && time <= params[4].time)  {
        setPrayerTime('asr')
     }
     else if (time >= params[4].time && time<=params[5].time) {
        setPrayerTime("shom")
     }
     else if (time >= params[5].time) {
        setPrayerTime("hufton")
     }
}
   useEffect(()=>{
    // if (!isLoading) {
    //     (async () => {
    //       setTime(await getCurrentTime(data.timezone))
    //       })()
    // }
    if (data) {
        currentTimeClass(data.timings)
    }

   },[data]);
   console.log(prayerTime);
    return (
        <>
        <div className="">{prayerTime}: {time}</div>
        {isLoading?<p>Loading...</p>:<Timings data={data.timings} activeClass={prayerTime}/>}

        </>
    )
}

export default HomePage
