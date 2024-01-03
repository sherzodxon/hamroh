import axios from "axios";
const getTimings = async(params)=>{
   const values = params.split("?");
   const city = values[0];
   const country =values[1]
try {
    const response = await axios.get(`https://api.aladhan.com/v1/timingsByAddress?address=${city},%20${country}`)
    const data = response.data.data.timings   
    return [
        {
            id:1,
            name:"Bomdod",
            time:data.Fajr,
        },
        {
            id:2,
            name:"Quyosh",
            time:data.Sunrise,
        },
        {
            id:3,
            name:"Peshin",
            time:data.Dhuhr,
        },
        {
            id:4,
            name:"Asr",
            time:data.Asr,
        },
        {
            id:5,
            name:"Shom",
            time:data.Maghrib,
        },
        {
            id:6,
            name:"Hufton",
            time:data.Isha,
        },
    ]
} catch (error) {
    console.log(error);
}
 
}

export {getTimings}
 const sd={
    Fajr: "06:54",
    Sunrise: "08:59",
    Asr: "13:53",
Dhuhr: "12:34",

Firstthird: "21:46",
Imsak: "06:44",
Isha: "18:07",
Lastthird: "03:22",
Maghrib: "16:09",
Midnight: "00:34",

Sunset: "16:09"
 }