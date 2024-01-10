import React from 'react'
import TimingsCard from '../TimingsCard';
import {Swiper, SwiperSlide} from 'swiper/react';
import {Autoplay} from 'swiper/modules'
import 'swiper/css';
import './index.scss'
function Timings({data, activeClass}) {
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
                    {data.map(el => 
                    <SwiperSlide className={activeClass} key={el.id}><TimingsCard className={el.class} name={el.name} time={el.time}/></SwiperSlide>)
}
                </Swiper>

            </ul>
        </section>
    )
}

export default Timings
