import React, {useEffect, useRef, useState} from 'react'
import PageControl from '../../assets/components/PageControl'
import './index.scss'
import SearchInput from '../../assets/components/SearchInput'
import Title from '../../assets/components/Title'
import SurahList from '../../assets/components/section/SurahList'
import {useQuery} from 'react-query'
import {getSurahs} from '../../boot/axios'
import {BOOK} from '../../boot/useApi'
import HomeSpinner from '../../assets/components/section/Spinner/HomeSpinner'
import {debounce, residualSurahs} from '../../boot/functions'
import InputSpinner from '../../assets/components/section/Spinner/InputSpinner'

function Book() {
    const [surahs,setSurahs] = useState([]);
    const {data,  isLoading} = useQuery("surahs", () => getSurahs(BOOK.surahs));
    const [searchedData,setSearchedData] = useState([]);
    const [search,setSearch] = useState(false);
    const searchRef = useRef();

    useEffect(() => {
        if (!isLoading) {
            setSurahs(data.concat(residualSurahs))
        }
    }, [data]);

    function handleSearch() {
        const searchValue = searchRef.current.input.value;
        const foundData = surahs.filter((el) => {

            const searchRegExp = new RegExp(searchValue, "gi");
            const searchText = `${el.nameUz}`;
            return searchText.match(searchRegExp);

        })
        setSearchedData(foundData);
        setSearch(false)
    }

    const debouncedSearchData = debounce(handleSearch, 1000);

    function handleChange() {
        setSearch(true)
        debouncedSearchData()
    }
    useEffect(() => {
        document.title = `Hamroh | Qur'on`;
    }, []);
    return (
        <div className="book">
            <div className="book__container container">
                <div className="book__header">
                    <PageControl next="/kalendar"/>
                    <Title text="Suralar"/>
                   <div className="book__search-wrapper">
                    <InputSpinner display={search} className="book__spinner"/>
                   <SearchInput
                        ref={searchRef}
                        onChange={handleChange}
                        maxWidth={100}
                        placeholder='Suralarni qidirish'
                        type="search"/>
                   </div>
                </div>
                <div className="book__body">
                    {isLoading
                        ? <HomeSpinner/>
                        : <SurahList
                            data={searchedData.length
                            ? searchedData
                            : surahs}/>}
                </div>
            </div>
        </div>
    )
}

export default Book
