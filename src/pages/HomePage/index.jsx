import React, {useEffect, useState} from 'react'
import {getCurrentTime, getTimings} from '../../boot/axios';
import {useSelector, useDispatch} from 'react-redux';
import {useQuery} from 'react-query';
import Timings from '../../assets/components/section/Timings';
import {useCurrentZone} from '../../contexts/context';
import './index.scss'
import Search from '../../assets/components/Search';
import HomeSpinner from '../../assets/components/section/Spinner/HomeSpinner';
import {checkTime} from '../../boot/functions';
import {editClassname, editMobile, editTablet} from '../../features/theme/browserThemes';

function HomePage() {
    const today = new Date();
    const seconds = today.getSeconds();
    const minutes = today.getMinutes();
    const hours = today.getHours();
    const {currentZone} = useCurrentZone();
    const [field,
        setField] = useState(`Tashkent/Uzbekistan`);
    const {data, error} = useQuery([
        "timings", field
    ], () => getTimings(field));
    const [hour,
        setHour] = useState(hours);
    const [minute,
        setMinute] = useState(minutes)
    const [second,
        setSecond] = useState(seconds);
    const [time,
        setTime] = useState(`${checkTime(hour)}:${checkTime(minute)}`);
    const [windowSize,
        setWindowSize] = useState(window.innerWidth);
    const browserClassname = useSelector((state) => state.browserThemes.containerClassName);
    const tablet = useSelector((state) => state.browserThemes.tablet);
    const mobile = useSelector((state) => state.browserThemes.mobile);

    const dispatch = useDispatch()
    useEffect(() => {
        const handleResizeWindow = () => setWindowSize(window.innerWidth)
        window.addEventListener("resize", handleResizeWindow);

        return () => {
            window.removeEventListener("resize", handleResizeWindow);
        };

    }, []);
    useEffect(() => {
        if (windowSize <= 870) {
            dispatch(editTablet(true))
        }

        if (windowSize <= 650) {
            //dispatch(editTablet(false))
            dispatch(editMobile(true))
        }
        if (windowSize > 870) {
            dispatch(editTablet(false))
            dispatch(editMobile(false))
        }

    }, [windowSize])

    useEffect(() => {
        const interval = setInterval(() => {
            setSecond(prevCount => {
                if (prevCount < 59) {
                    return prevCount + 1
                } else 
                    return 0
            });
        }, 1000);
        return () => clearInterval(interval);

    }, []);

    function currentTimeClass(params) {

        if (time >= params[0].time && time <= params[1].time) {
            dispatch(editClassname("fajr"))
        } else if (time >= params[1].time && time <= params[2].time) {
            dispatch(editClassname("sunrise"));
        } else if (time >= params[2].time && time <= params[3].time) {
            dispatch(editClassname("dhuhr"));
        } else if (time >= params[3].time && time <= params[4].time) {
            dispatch(editClassname("asr"))
        } else if (time >= params[4].time && time <= params[5].time) {
            dispatch(editClassname("maghrib"))
        } else if (time >= params[5].time) {
            dispatch(editClassname("isha"))
        } else {
            dispatch(editClassname("fajr"))
        }
    }

    useEffect(() => {
        if (second == 0) {
            setMinute(prevMinute => prevMinute + 1)
        } else if (minute > 59) {
            setMinute(0)
            setHour(prevHour => prevHour + 1)
        }
        setTime(`${checkTime(hour)}:${checkTime(minute)}`);

    }, [second]);

    useEffect(() => {
        setField(`${currentZone.state}?${currentZone.country}`);
        if (currentZone.timezone) {

            (async() => {
                const dateString = await getCurrentTime(currentZone.timezone)
                const timePart = dateString
                    .split('T')[1]
                    .split('.')[0]
                setHour( + timePart.split(':')[0])
                setMinute( + timePart.split(':')[1])
                setSecond( + timePart.split(':')[2])

            })()
        }
    }, [currentZone.timezone]);

    useEffect(() => {
        if (data
            ?.timings) {
            currentTimeClass(data.timings)
        }
    }, [second]);
    useEffect(() => {
        document.title = `Hamroh`;
    }, []);
    if (mobile) {
        return (
            <section className='home'>
                <div className={`container ${browserClassname}-container overflow-hidden-container` }>
                  <div className={`${browserClassname}-time home__date-time`}>
                  <div className={`${browserClassname}-timings tablet-timings`}>
                   <div className="home__tablet-head">
                    <button onClick={()=>window.location.reload()} className='home__reload-button'></button>
                     <h2 className='home__state'>{currentZone.city || currentZone.state}</h2>
                     <Search className="home__search-button"/>
                   </div>
                   <p className="home__tablet-date">{data?.date.gregorianDate}</p>
                   <h2
                        style={{
                        color: "#fff"
                    }}
                        className='home__time'>{checkTime(hour)}:{checkTime(minute)}:{checkTime(second)}</h2>
                    <p className='home__country'>{currentZone.country}</p>
                  
                    {!data
                        ? <HomeSpinner/>
                        : <Timings data={data}/>
}
                   </div>
                  </div>
                </div>
            </section>
        )

    }
    return (
        <section className='home'>
            <div className="home__header">
                <h2 className='home__time'>{checkTime(hour)}:{checkTime(minute)}:{checkTime(second)}</h2>
                <Search/>
            </div>
            {!data
                ? <HomeSpinner/>
                : <Timings data={data} />
}

        </section>
    )
}

export default HomePage