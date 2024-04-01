import React from 'react'
import {useEffect} from 'react';
import {useParams} from 'react-router-dom'
import {useState} from 'react';
import AyahList from '../../assets/components/section/AyahList';
import HomeSpinner from '../../assets/components/section/Spinner/HomeSpinner';
import ErrorSection from '../../assets/components/section/Error'
import axios from 'axios';
import {qoranList} from '../../boot/qoranList';
import PageControl from '../../assets/components/PageControl';
import Title from '../../assets/components/Title';
import './index.scss'

function SurahPage() {
    const [audios,
        setAudios] = useState([]);
    const [editionTexts,
        setEditionTexts] = useState({});
    const [arabicTexts,
        setArabicTexts] = useState([]);
    const [error,
        setError] = useState(false)
    const [isLoading,
        setIsLoading] = useState(true);
    const {id} = useParams();
    
    const getAllData = () => {
        const arabicText = axios.get(`https://api.alquran.cloud/v1/surah/${id}`);
        const arabicAudio = axios.get(`https://api.alquran.cloud/v1/surah/${id}/ar.alafasy`);
        const editionText = axios.get(`https://api.alquran.cloud/v1/surah/${id}/uz.sodik`);
        ///const uzbName=axios.get(`https://retoolapi.dev/OS6065/quronsuralar/${id}`);

        setIsLoading(true);
        axios
            .all([editionText, arabicText, arabicAudio])
            .then(axios.spread(({
                data: data1
            }, {
                data: data2
            }, {data: data3}) => {
                setEditionTexts({
                    ...data1.data,
                    nameUz: qoranList[id - 1].nameUz
                });
                setArabicTexts(data2.data.ayahs);
                setAudios(data3.data.ayahs);
            }))
            .catch(() => {
                setError(true)
            })
            . finally(() => {
                setIsLoading(false);

            });
    }
   
    useEffect(() => {
        //dispatch(fetchAyahs(id));
        getAllData()
    }, [id]);
    useEffect(() => {
        document.title = `Hamroh | ${editionTexts?.nameUz?editionTexts?.nameUz:" "}`;
    }, [editionTexts.nameUz]);
    if (error) {
        return <ErrorSection/>;
    }
    return (
        <div className="surah">
            <div className="surah__container container">
                <div className="surah__header">
                    <PageControl next={`/suralar/${ + id + 1}`}/>
                    <Title text={editionTexts.nameUz}/>
                    <div className="surah__box"></div>
                </div>
                <div className="surah__body">
                    {isLoading
                        ? <HomeSpinner/>
                        : <AyahList
                            arabicTexts={arabicTexts}
                            audios={audios}
                            editionTexts={editionTexts}/>
}
                </div>
            </div>
        </div>
    )
}

export default SurahPage
