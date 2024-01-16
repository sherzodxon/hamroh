import axios from "axios";
    //     (async () => {
    //    })()

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
                status:true,
                timings: [
                    {
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

export {
    getTimings,
    getCurrentTime,
    getCurrentZone
}