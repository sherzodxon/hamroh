import React from 'react';
import './index.scss'
import { addMinutesToTime, weekNameTranslator } from '../../../boot/functions';
const CalendarCard = ({active,readable,weekday,fajr,dhuhr,asr,maghrib,isha}) => {

    return (
        <div className={active?'calendar-card__active':"calendar-card"}>
            <div className="calendar-card__head">
                <p className='calendar-card__number calendar-card__day-number'>{readable}</p>
                <p className="calendar-card__day-name">{weekNameTranslator(weekday)}</p>
            </div>
            <ul className="calendar-card__list">
                <li className="calendar-card__item">
                    <p className="calendar-card__item-name">Bomdod</p>
                    <p className="calendar-card__item-time">{fajr.split("(")[0]}</p>
                </li>
                <li className="calendar-card__item">
                    <p className="calendar-card__item-name">Peshin</p>
                    <p className="calendar-card__item-time">{dhuhr.split("(")[0]}</p>
                </li>
                <li className="calendar-card__item">
                    <p className="calendar-card__item-name">Asr</p>
                    <p className="calendar-card__item-time">{addMinutesToTime(asr.split("(")[0])}</p>
                </li>
                <li className="calendar-card__item">
                    <p className="calendar-card__item-name">Shom</p>
                    <p className="calendar-card__item-time">{maghrib.split("(")[0]}</p>
                </li>
                <li className="calendar-card__item">
                    <p className="calendar-card__item-name">Hufton</p>
                    <p className="calendar-card__item-time">{isha.split("(")[0]}</p>
                </li>
            </ul>
        </div>
    );
}
 export default CalendarCard
