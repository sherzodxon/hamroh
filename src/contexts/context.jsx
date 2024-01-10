import React, { createContext, useContext, useEffect, useState } from 'react'
import { getCurrentZone } from '../boot/axios';
export const DataCurrentZone = createContext();

const  CurrentZoneProvider=({children})=> {
    const [currentZone,setCurrentZone]=useState({});
    const [latitude, setLatitude] = useState(0);
    const [longitude, setLongitude] = useState(0);
    const [zone,setZone]=useState(false)

    navigator.geolocation.getCurrentPosition((position) => {
        setLatitude(position.coords.latitude);
        setLongitude(position.coords.longitude);
        setZone(true)
    });

    useEffect(()=>{
        (async () => {
          setCurrentZone(await getCurrentZone(latitude,longitude))
        })()
    },[latitude])
    
    if (!zone) {
      return(
        <h1>Ruxsat yoq</h1>
      )
    }
    else
    return (
        <DataCurrentZone.Provider value={{currentZone,setCurrentZone}}>
           {children}
        </DataCurrentZone.Provider>
    )
}
export const useCurrentZone=()=>{
    return useContext(DataCurrentZone)
}
export default CurrentZoneProvider