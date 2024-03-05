import axios from "axios";
import {
    book,
    name,
    surah
} from "./useApi";
import { addMinutesToTime } from "./functions";


const getTimings = async (params) => {
    const values = params.split("?");
    const city = values[0];
    const country = values[1]
    if (city && country) {
        try {
            const response = await axios.get(`https://api.aladhan.com/v1/timingsByAddress?address=${city},%20${country}&method=8`);
            const data = await response.data.data.timings;
            return {
                timezone: response.data.data.meta.timezone,
                timings: [{
                        id: 1,
                        name: "Bomdod",
                        time: data.Fajr,
                        class: "fajr-item"
                    },
                    {
                        id: 2,
                        name: "Quyosh",
                        time: data.Sunrise,
                        class: "sunrise-item"
                    },
                    {
                        id: 3,
                        name: "Peshin",
                        time: data.Dhuhr,
                        class: "dhuhr-item"
                    },
                    {
                        id: 4,
                        name: "Asr",
                        time: addMinutesToTime(data.Asr),
                        class: "asr-item"
                    },
                    {
                        id: 5,
                        name: "Shom",
                        time: data.Maghrib,
                        class: "maghrib-item"
                    },
                    {
                        id: 6,
                        name: "Hufton",
                        time: data.Isha,
                        class: "isha-item"
                    },
                ]
            }
        } catch (error) {
            return{
                status:error.message
            }
        }

    }
}
const getCurrentTime = async (params) => {
    try {
        //https://api.aladhan.com/v1/currentTime?zone=
        const response = await axios.get(`https://worldtimeapi.org/api/timezone/${params}`);
        return response.data.datetime;
    } catch (error) {
        console.log(error);
    }
}
const getCurrentZone = async (latitude, longitude) => {
try {
    const response = await axios.get(`https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${(latitude)}&longitude=${longitude}`);
    return {
        country: response.data.countryName,
        state: response.data.city,
        city: response.data.locality,
        timezone: response.data.localityInfo.informative[2]?.name || response.data.localityInfo.informative[1]?.name,
        latitude:latitude,
        longitude:longitude,
    }
} catch (error) {
    return{
        country:error.message,
        state:error.message,
        city:error.message,
        timezone:error.message
    }
}

}
const getCalendar = async(country,city,date)=>{
    try {
        const response = await axios.get(`https://api.aladhan.com/v1/calendarByCity?city=${city}&country=${country}&method=1&month=${date.split("-")[1]}&year=${date.split("-")[0]}`)
        return response.data.data
    } catch (error) {
        
    }
}
const getNames = async (url) => {
    try {
        const response = await name.get(url)
        return response.data
    } catch (error) {
        console.log(error);
    }
}
const nameLiked = async (url, data) => {
    try {
        const response = await name.put(url, data);
        return response.data;
    } catch (error) {
        console.log(error);
    }
};
const getSurahs = async (url) => {
    try {
        const response = await book.get(url);
        return response.data
    } catch (error) {
        console.log(error);
    }
}
const oneSurah = async (url, id) => {
    try {
        //const response = await surah.get(url, id);
        const response = await axios.get(`https://api.alquran.cloud/v1/surah/${id}/ar.alafasy`);
        const translatedRes = await axios.get(`https://cdn.jsdelivr.net/gh/fawazahmed0/quran-api@1/editions/uzb-muhammadsodikmu/${id}.json`);
        const translatedData = await translatedRes.data.chapter
        return await response.data.data.ayahs.map((element) => ({
            id: element.number,
            numberInSurah:element.numberInSurah, 
            textArabic: element.text,
            textUzb: translatedData[element.numberInSurah - 1].text,
            audio:element.audio,
            isPlay:false
        }))
     
    } catch (error) {
    console.log(error);
    }
}
const getAudio = async(url)=>{
    try {
        const res = await axios.get(`https://api.alquran.cloud/v1/surah/${url}/ar.alafasy`);
        console.log(res);
    } catch (error) {
       console.log(error); 
    }
}
export {
    getTimings,
    getCurrentTime,
    getCurrentZone,
    getNames,
    nameLiked,
    getSurahs,
    oneSurah,
    getAudio,
    getCalendar
}