import React, { useEffect, useState } from 'react'
import  './index.scss'
import heart from '../../img/heart.svg'
import likedsvg from '../../img/liked.svg'
import { Link } from 'react-router-dom'
import { nameLiked } from '../../../boot/axios'
import { NAMES } from '../../../boot/useApi'
import buttonClickSound from '../../audios/bubbles.mp3'

function NamesCard({id,name,text,like,refetch}) {
    const [liked,setIsLiked]=useState(false)
    useEffect(()=>{
      if (like=="true") {
        setIsLiked(true)
      }
      else if (like=="false") {
        setIsLiked(false)
      }
    },[like]);
    
   async function handleLiked(params) {
   const sound = new Audio(buttonClickSound)
   sound.play()
    setIsLiked(!liked)
    const data={
        id:id,
        name:name,
        comment:text,
        isLiked:liked?"false":"true"
    }
    await nameLiked(NAMES.put_names(params),data)
   refetch();
   }

    return (
        <li className='names-card'>
            <Link  to={`/ismlar/${id}`} className='names-card__link'>
              </Link>
            <div className="names-card__info-wrapper">
            <p className='names-card__number'>{id}</p>
              <div className="names-card__name-wrapper">
                <h3 className='names-card__title'>{name}</h3>
                <p className='names-card__text'>{text}</p>
              </div>
            </div>
            <button onClick={()=>handleLiked(id)} className='names-card__button'>
                <img src={liked?likedsvg:heart} className='names-card__heart' alt="like" />
            </button>
          
        </li>
    )
}

export default NamesCard
