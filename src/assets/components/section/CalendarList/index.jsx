import React from 'react';
import CalendarCard from '../../CalendarCard';
import './index.scss'
import { isToday } from '../../../../boot/functions';
 
const CalendarList = ({data}) => {
    return (
        <ul className='calendar-list'>
            {
                data.map((el,index) =>< CalendarCard key={index} fajr = {el.timings.Fajr} dhuhr = {el.timings.Dhuhr} asr = {el.timings.Asr} maghrib = {el.timings.Maghrib} isha={el.timings.Isha} weekday={el.date.gregorian.weekday.en} readable={el.date.gregorian.day} active = {isToday(el.date.gregorian.date)} />)
            }
        </ul>
    );
}
 

 
export default CalendarList;