import React, { useEffect, useState } from 'react'
import { getCurrentTime, getTimings } from '../../boot/axios';
import { useSelector, useDispatch } from 'react-redux';
import { useQuery } from 'react-query';
import Timings from '../../assets/components/section/Timings';
import { useCurrentZone } from '../../contexts/context';
import './index.scss'
import Search from '../../assets/components/Search';
import HomeSpinner from '../../assets/components/section/Spinner/HomeSpinner';
import { checkTime } from '../../boot/functions';
import { editClassname, editMobile, editTablet } from '../../features/counter/browserThemes';

function HomePage() { 
    const today=new Date(); 
    const seconds=today.getSeconds();
    const minutes=today.getMinutes(); 
    const hours=today.getHours(); 
    const {currentZone}=useCurrentZone(); 
    const [field,setField]=useState(`Tashkent/Uzbekistan`); 
    const [prayerTime,setPrayerTime]=useState("- - -"); 
    const {data,error}=useQuery(["timings",field], ()=>getTimings(field));
    const [hour,setHour]=useState(hours);
    const [minute,setMinute]=useState(minutes)
    const [second, setSecond] = useState(seconds);
    const [time,setTime]=useState(`${checkTime(hour)}:${checkTime(minute)}`);
    const [windowSize, setWindowSize] = useState(window.innerWidth);
    const browserClassname=useSelector((state)=>state.browserThemes.containerClassName);
    const tablet = useSelector((state)=>state.browserThemes.tablet);
    const mobile=useSelector((state)=>state.browserThemes.mobile);

    const dispatch =useDispatch()
    useEffect(() => {
        const handleResizeWindow = () => setWindowSize(window.innerWidth)
        window.addEventListener("resize", handleResizeWindow);
    
        return () => {
          window.removeEventListener("resize", handleResizeWindow);
        };
    
    }, []);
    useEffect(() => {
      if (windowSize<=870) {
        dispatch(editTablet(true))
      }
       
     if (windowSize<=650) {
        dispatch(editTablet(false))
        dispatch(editMobile(true))
      }
      if (windowSize>870) {
        dispatch(editTablet(false))
        dispatch(editMobile(false))
      }
     
    },[windowSize])

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
                setPrayerTime("bomdod");
                dispatch(editClassname("fajr-container"))
             }
             else if (time>=params[1].time&& time<=params[2].time) {
                setPrayerTime("quyosh");
                dispatch(editClassname("sunrise-container"));
                
             }
             else if (time>=params[2].time&& time <=params[3].time) {
              setPrayerTime("peshin");
              dispatch(editClassname("dhuhr-container"));
             }
             else if (time >=params[3].time && time <= params[4].time)  {
                setPrayerTime('asr');
                dispatch(editClassname("asr-container"))
             }
             else if (time >= params[4].time && time<=params[5].time) {
                setPrayerTime("shom");
                dispatch(editClassname("maghrib-container"))
             }
             else if (time >= params[5].time) {
                setPrayerTime("hufton");
                dispatch(editClassname("isha-container"))
             }
             else{
                dispatch(editClassname("night-container"))
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
        setTime(`${checkTime(hour)}:${checkTime(minute)}`);
        
        },[second]);
   

        useEffect(()=>{
        setField(`${currentZone.state}?${currentZone.country}`);
        if (currentZone.timezone) {

        (async () => {
        const dateString = await getCurrentTime(currentZone.timezone)
        const timePart = dateString.split('T')[1].split('.')[0]
        setHour(+timePart.split(':')[0])
        setMinute(+timePart.split(':')[1])
        setSecond(+timePart.split(':')[2])
        
        })()
        }
        },[currentZone.timezone]);

        useEffect(()=>{
        if (data?.timings) {
        currentTimeClass(data.timings)
        }
        },[second]);
        
        if (tablet || mobile) {
            return(
                <section className='home'>
                  <div className={`container ${browserClassname}`}>
                  <h2 style={{color:"#fff"}} className='home__time'>{checkTime(hour)}:{checkTime(minute)}:{checkTime(second)}</h2>
                  </div>
                </section>
            )
            
        }
        return (
        <section className='home'>
            <div className="home__header">
                <h2 className='home__time'>{checkTime(hour)}:{checkTime(minute)}:{checkTime(second)}</h2>
                <Search />
            </div>
            {!data?<HomeSpinner/>:
            <Timings data={data} activeClass={prayerTime} />
            }
            
        </section>
        )
    }

        export default HomePage