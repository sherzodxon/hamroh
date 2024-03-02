export function addMinutesToTime(inputTime) {
    // Parse the input time into hours and minutes
    const [hours, minutes] = inputTime.split(':').map(Number);
  
    // Add 40 minutes to the input time
    const totalMinutes = hours * 60 + minutes + 40;
  
    // Calculate the new hours and minutes
    const newHours = Math.floor(totalMinutes / 60) % 24;
    const newMinutes = totalMinutes % 60;
  
    // Format the result
    const formattedResult = `${String(newHours).padStart(2, '0')}:${String(newMinutes).padStart(2, '0')}`;
  
    // Return the formatted result
    return formattedResult;
  }
  
  // Example usage:

 

  export function checkTime(i) {
    if (i < 10)
     { 
        i="0" + i; 
    } 
    return i; } 
  export  const debounce = (mainFunction, delay) => {
    let timer;
    return function (...args) {
      clearTimeout(timer);
      timer = setTimeout(() => {
        mainFunction(...args);
      }, delay);
    };
  };
  export  const weekNameTranslator=(name)=>{
    switch (name) {
        case "Monday":
            return "Dushanba"
        case "Tuesday":
            return "Seshanba"
        case "Wednesday":
            return "Chorshanba"
        case "Thursday":
            return "Payshanba"
        case "Friday":
            return "Juma"
        case "Sunday":
            return "Yakshanba"
        case "Saturday":
            return "Shanba"
        default:
            break;
    }
}
    export const residualSurahs=[
      {
        id:101,
        "number": 101,
        "name": "سُورَةُ القَارِعَةِ",
        "englishName": "Al-Qaari'a",
        "nameUz": "Qori'a",
        "audio": "https://cdn.islamic.network/quran/audio-surah/128/ar.alafasy/101.mp3",
        "playing": false,
        "numberOfAyahs": 11,

    },
    {   
        id:102,
        "number": 102,
        "name": "سُورَةُ التَّكَاثُرِ",
        "englishName": "At-Takaathur",
        "nameUz": "Takosur",
        "audio": "https://cdn.islamic.network/quran/audio-surah/128/ar.alafasy/102.mp3",
        "playing": false,
        "numberOfAyahs": 8,

    },
    {    
        id:103,
        "number": 103,
        "name": "سُورَةُ العَصۡرِ",
        "englishName": "Al-Asr",
        "nameUz": "Asr",
        "audio": "https://cdn.islamic.network/quran/audio-surah/128/ar.alafasy/103.mp3",
        "playing": false,
        "numberOfAyahs": 3,

    },
    {
        id:104,
        "number": 104,
        "name": "سُورَةُ الهُمَزَةِ",
        "englishName": "Al-Humaza",
        "nameUz": "Humaza",
        "audio": "https://cdn.islamic.network/quran/audio-surah/128/ar.alafasy/104.mp3",
        "playing": false,
        "numberOfAyahs": 9,

    },
    {    
        id:105,
        "number": 105,
        "name": "سُورَةُ الفِيلِ",
        "englishName": "Al-Fil",
        "nameUz": "Fil",
        "audio": "https://cdn.islamic.network/quran/audio-surah/128/ar.alafasy/18.mp3",
        "playing": false,
        "numberOfAyahs": 5,

    },
    {    
         id:106,
        "number": 106,
        "name": "سُورَةُ قُرَيۡشٍ",
        "englishName": "Quraish",
        "nameUz": "Quraysh",
        "audio": "https://cdn.islamic.network/quran/audio-surah/128/ar.alafasy/106.mp3",
        "playing": false,
        "numberOfAyahs": 4,

    },
    {
         id:107,
        "number": 107,
        "name": "سُورَةُ المَاعُونِ",
        "englishName": "Al-Maa'un",
        "nameUz": "Mo'un",
        "audio": "https://cdn.islamic.network/quran/audio-surah/128/ar.alafasy/107.mp3",
        "playing": false,
        "numberOfAyahs": 7,
    },
    {
        id:108,
        "number": 108,
        "name": "سُورَةُ الكَوۡثَرِ",
        "englishName": "Al-Kawthar",
        "nameUz": "Kavsar",
        "audio": "https://cdn.islamic.network/quran/audio-surah/128/ar.alafasy/108.mp3",
        "playing": false,
        "numberOfAyahs": 3,
    },
    {   
        id:109,
        "number": 109,
        "name": "سُورَةُ الكَافِرُونَ",
        "englishName": "Al-Kaafiroon",
        "nameUz": "Kofirun",
        "audio": "https://cdn.islamic.network/quran/audio-surah/128/ar.alafasy/109.mp3",
        "playing": false,
        "numberOfAyahs": 6,
    },
    {   
         id:110,
        "number": 110,
        "name": "سُورَةُ النَّصۡرِ",
        "englishName": "An-Nasr",
        "nameUz": "Nasr",
        "audio": "https://cdn.islamic.network/quran/audio-surah/128/ar.alafasy/110.mp3",
        "playing": false,
        "numberOfAyahs": 3,
    },
    {     
        id:111,
        "number": 111,
        "name": "سُورَةُ المَسَدِ",
        "englishName": "Al-Masad",
        "nameUz": "Masad",
        "audio": "https://cdn.islamic.network/quran/audio-surah/128/ar.alafasy/111.mp3",
        "playing": false,
        "numberOfAyahs": 5,
    },
    {     
        id:112,
        "number": 112,
        "name": "سُورَةُ الإِخۡلَاصِ",
        "englishName": "Al-Ikhlaas",
        "nameUz": "Ixlos",
        "audio": "https://cdn.islamic.network/quran/audio-surah/128/ar.alafasy/112.mp3",
        "playing": false,
        "numberOfAyahs": 4,
    },
    {   
        id:113,
        "number": 113,
        "name": "سُورَةُ الفَلَقِ",
        "englishName": "Al-Falaq",
        "nameUz": "Falaq",
        "audio": "https://cdn.islamic.network/quran/audio-surah/128/ar.alafasy/113.mp3",
        "playing": false,
        "numberOfAyahs": 5,
    },
    {    
        id:114,
        "number": 114,
        "name": "سُورَةُ النَّاسِ",
        "englishName": "An-Naas",
        "nameUz": "Nos",
        "audio": "https://cdn.islamic.network/quran/audio-surah/128/ar.alafasy/114.mp3",
        "playing": false,
        "numberOfAyahs": 6,
    }
    ]
