import React, { createContext, useContext, useEffect, useState } from 'react'
import { getCurrentZone } from '../boot/axios';
import RegistrationPage from '../pages/RegistrationPage';
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
      if (latitude) {
        (async () => {
          setCurrentZone(await getCurrentZone(latitude,longitude))
        })()
      }
    },[latitude])
    useEffect(()=>{
     if (currentZone?.city) {
      setZone(true)
     }
    },[currentZone])
  
    return (
        <DataCurrentZone.Provider value={{currentZone,setCurrentZone}}>
           {zone?children:<RegistrationPage/>}
        </DataCurrentZone.Provider>
    )
}
export const useCurrentZone=()=>{
    return useContext(DataCurrentZone)
}
export default CurrentZoneProvider