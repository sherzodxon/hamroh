import React, {useEffect, useState} from 'react'
import {getCalendar} from '../../boot/axios';
import {useCurrentZone} from '../../contexts/context';
import PageControl from '../../assets/components/PageControl';
import Title from '../../assets/components/Title';
import {Input} from 'antd';
import './index.scss'
import HomeSpinner from '../../assets/components/section/Spinner/HomeSpinner';
import CalendarList from '../../assets/components/section/CalendarList';
import { checkTime, monthNameTranslator } from '../../boot/functions';

function Calendar() {
    const time = new Date();
    const year = time.getFullYear();
    const months = time.getMonth()+1;
    const {currentZone} = useCurrentZone();
    const [data,setData] = useState([]);
    const [date,setDate]=useState(`${year}-${checkTime(months)}`)
    const [isLoading,setIsloading] = useState(true);
    
    useEffect(() => {
    
        if (currentZone.city && currentZone.country) {
            (async() => {
                setIsloading(true)
                const dataRes = await getCalendar(currentZone.country, currentZone.city,date);
                setData(dataRes)
                setIsloading(false)
            })()
           
        }
       
    }, [currentZone.country,date]);

    return (
        <div className="calendar">
            <div className="calendar__container container">
                <div className="calendar__header">
                    <PageControl next="/xarita"/>
                    <Title text={monthNameTranslator(data[0]?.date.gregorian.month.en) || "Oylik taqvim"}/>
                    <div className="book__search-wrapper">
                        <Input defaultValue={date} onChange={(e)=>setDate(e.target.value)}  type='month'/>
                    </div>
                </div>
                <div className="calendar__body">
                    {isLoading
                        ? <HomeSpinner/>
                        : <CalendarList data={data}/>}
                </div>
            </div>
        </div>
    )
}

export default Calendar
