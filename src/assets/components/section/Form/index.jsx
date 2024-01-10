import { Button, Form, Select } from 'antd';
import React, { useEffect } from 'react'
import { useState } from 'react';
import {
GetCountries,
GetState,
GetCity,
} from "react-country-state-city";
import './index.scss'
import { useCurrentZone } from '../../../../contexts/context';
import InputSpinner from '../Spinner/InputSpinner';

function FormSection({props}) {
const {setCurrentZone} =useCurrentZone()
const [countryid, setCountryid] = useState(0);
const [countryList, setCountriesList] = useState([]);
const [stateChange,setStateChange]=useState(true);
const [cityChange,setCityChange]=useState(true)
const [stateList, setStateList] = useState([]);
const [cityList, setCityList] = useState([]);
const [country,setCountry]=useState("");
const [stateLoader,setStateLoader]=useState(false);
const [cityLoader,setCityLoader]=useState(false)
const [state,setState]=useState("");
const [city,setCity]=useState("")

useEffect(() => {
GetCountries().then((result) => {
setCountriesList(result);
});
}, []);
async function getFinish() {
const data={
country:country,
state:state,
city:city
}
setCurrentZone(data)
}

return (
<Form layout="vertical" style={{ maxWidth: 600 }} onFinish={getFinish}>
    <Form.Item  name="country"  rules={[{ required: true, message: 'Iltimos, davlat nomini kiriting' }]}>
        <Select  placeholder="Davlat" onChange={(value)=> {
            const country = countryList[value]; //here you will get full country object.
            setCountryid(country.id);
            setCountry(country.name)
            setStateLoader(true)
            GetState(country.id).then((result) => {
            setStateList(result);
            setStateChange(false)
            setStateLoader(false)
            });
            }}
            >
            {countryList.map((item, index) => (
            <Select.Option key={index} value={index}>
                <div className="option-wrapper">
                    <img src={`https://purecatamphetamine.github.io/country-flag-icons/3x2/${item.iso2}.svg`}
                        className='option-flag' />
                    <p className='option-item'>{item.name}</p>
                </div>
            </Select.Option>
            ))}
        </Select>
    </Form.Item>
    <div className="form__input-wrapper">
    <Form.Item name="state" rules={[{ required: true, message: 'Iltimos, shahar nomini kiriting' }]}>
        <Select disabled={stateChange} placeholder="Shtat/Viloyat" onChange={(value)=> {
            const state = stateList[value];
            setState(state.name)
            setCityLoader(true)
            GetCity(countryid, state.id).then((result) => {
            setCityList(result);
            setCityChange(false)
            setCityLoader(false)
            });

            }}>
            {stateList.map((item, index) => (
            <Select.Option key={index} value={index}>
                {item.name}
            </Select.Option>
            ))}
        </Select>
    </Form.Item>
    <InputSpinner display={stateLoader}/>
    </div>
    <div className="form__input-wrapper">
    <Form.Item name="city" rules={[{ required: true, message: 'Iltimos, mintaqa nomini kiriting' }]}>
        <Select disabled={cityChange} placeholder="Tuman/Shahar" onChange={(value)=> {
            const city = cityList[value];
            setCity(city.name)
            }}>
            {cityList.map((item, index) => (
            <Select.Option key={index} value={index}>
                {item.name}
            </Select.Option>
            ))}
        </Select>
    </Form.Item>
    <InputSpinner display={cityLoader}/>
    </div>
    <Form.Item>
        <Button htmlType='submit' key="submit">Submit</Button>
    </Form.Item>
    
</Form>
)
}

export default FormSection