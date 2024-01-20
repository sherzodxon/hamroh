import axios from "axios";
import {
    book,
    name,
    surah
} from "./useApi";


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
                status: true,
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
                        time: data.Asr,
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
            console.log(error);
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
    const response = await axios.get(`https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${(latitude)}&longitude=${longitude}`);
    return {
        country: response.data.countryName,
        state: response.data.city,
        city: response.data.locality,
        timezone: response.data.localityInfo.informative[1].name
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
        const response = await surah.get(url, id);
        const translatedRes = await axios.get(`https://cdn.jsdelivr.net/gh/fawazahmed0/quran-api@1/editions/uzb-muhammadsodikmu/${id}.json`);
        const translatedData = translatedRes.data.chapter
        return response.data.data.ayahs.map((element) => ({
            id: element.number,
            textArabic: element.text,
            textUzb: translatedData[element.number - 1].text

        }))
    } catch (error) {

    }
}
export {
    getTimings,
    getCurrentTime,
    getCurrentZone,
    getNames,
    nameLiked,
    getSurahs,
    oneSurah
}