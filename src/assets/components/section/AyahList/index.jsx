import React, {useContext} from 'react'
import AyahCard from '../../AyahCard';
import {useDispatch} from 'react-redux';
import {setPlaylist} from "../../../../features/ayahs/audioSlice";
import {PlaylistsContext} from "../../../../contexts/audioContext";
import './index.scss'

function AyahList({audios, editionTexts, arabicTexts}) {

    const dispatch = useDispatch();
    const {setCurrentPlaylistContext} = useContext(PlaylistsContext);

    return (
        <ul className='oyat-list'>
            {editionTexts.ayahs
                ?.map((item, index) =>< AyahCard transText = {
                    item.text
                }
                arabicText = {
                    arabicTexts[index].text
                }
                number = {
                    item.numberInSurah
                }
                key = {
                    item.numberInSurah
                }
                setPlaylist = {
                    () => {
                        setCurrentPlaylistContext(audios);
                        dispatch(setPlaylist(audios));
                    }
                }
                audioUrl = {
                    audios[item.numberInSurah - 1].audio
                }
                ayahName = {
                    editionTexts.nameUz
                }
                surahNumber = {
                    editionTexts.number
                } />)
}
        </ul>
    )
}

export default AyahList
