import house from '../../../assets/img/house.svg'
import ism from '../../../assets/img/99name.svg'
import book from '../../../assets/img/quran-svg1.svg'
import zikr from '../../../assets/img/pray1.svg'
import calendar from '../../../assets/img/calendar-r.svg'
import map from '../../../assets/img/maps.svg'

export let sidebarRoutes=[
    {
        id:1,
        to:"/",
        title:"Uy",
        active:true,
        image:house,
    },
    {
        id:2,
        to:"/ismlar",
        title:"Asmo-al-Husna",
        active:false,
        image:ism,
 
    },
    {
        id:3,
        to:"/qur'on",
        title:"Qur'on",
        active:false,
        image:book,
     
    },
    {
        id:5,
        to:"/kalendar",
        title:"Oylik-taqvim",
        active:false,
        image:calendar,
      
    },
    {
        id:6,
        to:"/xarita",
        title:"Xarita",
        active:false,
        image:map,
        
    },

]