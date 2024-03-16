import React, { useState } from 'react'
import TimingsCard from '../../TimingsCard'
import {Swiper, SwiperSlide} from 'swiper/react';
import {Autoplay} from 'swiper/modules'
import 'swiper/css';
import './index.scss'
import ErrorSection from '../Error';
import {useSelector} from 'react-redux';
import Draggable from '../Draggable';

function Timings({data, activeClass}) {
    const tablet = useSelector((state) => state.browserThemes.tablet);
    const browserClassname=useSelector((state)=>state.browserThemes.containerClassName)
    
    if (data.status) {
        return (<ErrorSection/>)
    }
    if (tablet) {
        return (
         <section className="timings__tablet">
            <Draggable data={data} />
         </section>
        )
    }
     else {
        return (
            <section className='timings'>
                <ul className='timings__list'>
                    <Swiper
                        slidesPerView={3}
                        spaceBetween={35}   
                        modules={[Autoplay]}
                        className="mySwiper"
                        autoplay={{
                        delay: 800,
                        disableOnInteraction: false
                    }}>
                        {data?.timings
                                .map(el => <SwiperSlide className={`${browserClassname}__slide`} key={el.id}><TimingsCard className={el.class} name={el.name} time={el.time}/></SwiperSlide>)
}
                    </Swiper>

                </ul>
            </section>
        )
    }
}

export default Timings
