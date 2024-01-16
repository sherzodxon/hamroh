import React, { useEffect, useState } from 'react'
import { getCurrentTime, getTimings } from '../../boot/axios'
import { useQuery } from 'react-query';
import Timings from '../../assets/components/section/Timings';
import { useCurrentZone } from '../../contexts/context';
import './index.scss'
import Search from '../../assets/components/Search';
import HomeSpinner from '../../assets/components/section/Spinner/HomeSpinner';

function checkTime(i) {
if (i < 10)
 { 
    i="0" + i; 
} 
return i; } 
function HomePage() { 
    const today=new Date(); 
    const seconds=today.getSeconds();
    const minutes=today.getMinutes(); 
    const hours=today.getHours(); 
    const {currentZone}=useCurrentZone(); 
    const [field,setField]=useState(`Tashkent/Uzbekistan`); 
    const [prayerTime,setPrayerTime]=useState("- - -"); 
    const {data}=useQuery(["timings",field], ()=>getTimings(field));
    const [hour,setHour]=useState(hours);
    const [minute,setMinute]=useState(minutes)
    const [second, setSecond] = useState(seconds);
    const [time,setTime]=useState(`${checkTime(hour)}:${checkTime(minute)}`)

    useEffect(() => {
    const interval = setInterval(() => {
    setSecond(prevCount => {
    if (prevCount<59) { 
        return prevCount + 1 
    } else return 0
     }); }, 1000); 
     return ()=> clearInterval(interval);

    }, []);

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
        if (second==0) {
        setMinute(prevMinute=>prevMinute+1)
        }
        else if (minute >59) {
        setMinute(0)
        setHour(prevHour=>prevHour+1)
        }
        setTime(`${checkTime(hour)}:${checkTime(minute)}`)
        },[second])

        useEffect(()=>{
        setField(`${currentZone.state}?${currentZone.country}`);
        if (currentZone.timezone) {

        (async () => {
        const dateString = await getCurrentTime(currentZone.timezone)
        const timePart = dateString.split('T')[1].split('.')[0];
        setHour(+timePart.split(':')[0])
        setMinute(+timePart.split(':')[1])
        setSecond(+timePart.split(':')[2])
        })()
        }
        },[currentZone.timezone]);

        useEffect(()=>{
        if (data) {
        currentTimeClass(data.timings)
        }
        },[data,time]);


        return (
        <section className='home'>
            <div className="home__header">
                <h2 className='home__time'>{checkTime(hour)}:{checkTime(minute)}:{checkTime(second)}</h2>
                <Search />
            </div>
            {!data?<HomeSpinner/>:
            <Timings data={data.timings} activeClass={prayerTime} />
            }
            
        </section>
        )
    }

        export default HomePage