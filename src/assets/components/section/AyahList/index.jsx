import React, { useEffect } from 'react'
import AyahCard from '../../AyahCard';
import PageControl from '../../PageControl';
import { useDispatch, useSelector } from 'react-redux';
import { fetchAyahs } from '../../../../features/ayahs/ayahsSlice';
import HomeSpinner from '../Spinner/HomeSpinner';
import { useParams } from 'react-router-dom';

function AyahList() {
  const dispatch = useDispatch();
  const posts = useSelector((state) => state.ayahs.data);
  const status = useSelector((state) => state.ayahs.status);
  const error = useSelector((state) => state.ayahs.error);
   const {id}=useParams();

  useEffect(() => {
    dispatch(fetchAyahs(id));
  }, [dispatch]);

  if (status === 'loading') {
    return <HomeSpinner/>;
  }

  if (status === 'failed') {
    return <div>Error: {error}</div>;
  }

    return (
       <div className="oyat-list">
       <PageControl next="/zikr"/>
         <ul className='oyat-list__list'>
           {
             posts.map(el=><AyahCard key={el.id} number={el.id} textArab={el.textArabic} textUzb={el.textUzb} playing={el.isPlay} numberOfAyahs={el.numberOfAyahs} />)
           }
        </ul>
       </div>
    )
}

export default AyahList
