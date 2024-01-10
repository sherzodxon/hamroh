import React, { useEffect, useState } from 'react'
import { getCurrentTime, getTimings } from '../../boot/axios'
import { useQuery } from 'react-query';
import Timings from '../../assets/components/section/Timings';
import { useCurrentZone } from '../../contexts/context';

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
  const {currentZone}=useCurrentZone();
    const [field,setField]=useState(``);
    const [prayerTime,setPrayerTime]=useState("- - -");
    const {data,isLoading}=useQuery(["timings" ,field], ()=>getTimings(field));
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
        (async () => {
       })()

      setField(`${currentZone.state}?${currentZone.country}`);

      if (data) {
        currentTimeClass(data.timings)
    }

   },[data,currentZone]);

    return (
        <>
        <div className="">{prayerTime}: {time}</div>
        {isLoading?<p>Loading...</p>:<Timings data={data.timings} activeClass={prayerTime}/>}

        </>
    )
}

export default HomePage
