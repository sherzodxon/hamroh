import axios from "axios";
const getTimings = async (params) => {
    const values = params.split("?");
    const city = values[0];
    const country = values[1]
    try {
        const response = await axios.get(`https://api.aladhan.com/v1/timingsByAddress?address=${city},%20${country}&method=8`)
        const data = await response.data.data.timings;
       
        return {
           timezone:response.data.data.meta.timezone,
            timings: [
                {
                    id: 1,
                    name: "Bomdod",
                    time: data.Fajr,
                    class:"fajr-item"
                },
                {
                    id: 2,
                    name: "Quyosh",
                    time: data.Sunrise,
                    class:"sunrise-item"
                },
                {
                    id: 3,
                    name: "Peshin",
                    time: data.Dhuhr,
                    class:"dhuhr-item"
                },
                {
                    id: 4,
                    name: "Asr",
                    time: data.Asr,
                    class:"asr-item"
                },
                {
                    id: 5,
                    name: "Shom",
                    time: data.Maghrib,
                    class:"maghrib-item"
                },
                {
                    id: 6,
                    name: "Hufton",
                    time: data.Isha,
                    class:"isha-item"
                },
            ]
        }
  

    } catch (error) {
        console.log(error);
    }

}
const getCurrentTime =async(params)=>{
try {
     const response = await axios.get(`https://api.aladhan.com/v1/currentTime?zone=${params}`);
     return response.data.data
} catch (error) {
    console.log(error);
}
}
export {
    getTimings,getCurrentTime
}
const sd = {
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