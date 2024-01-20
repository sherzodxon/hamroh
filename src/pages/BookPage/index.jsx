import React, { useEffect } from 'react'
import { oneSurah } from '../../boot/axios'
import { SURAH } from '../../boot/useApi'

function Book() {
    useEffect(()=>{
        (async () => {
           console.log( await oneSurah(SURAH.one_surah(1),1));
       })()
  },[])
    return (
     <div className="book">
        <div className="container"></div>
     </div>
    )
}

export default Book
