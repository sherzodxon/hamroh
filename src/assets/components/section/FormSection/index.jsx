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
import { Option } from 'antd/es/mentions';

function FormSection({className,maxWidth,buttonTitle}) {
const {currentZone,setCurrentZone} =useCurrentZone()
const [countryid, setCountryid] = useState(0);
const [countryList, setCountriesList] = useState([]);
const [stateChange,setStateChange]=useState(true);
const [cityChange,setCityChange]=useState(true)
const [stateList, setStateList] = useState([]);
const [cityList, setCityList] = useState([]);
const [country,setCountry]=useState("");
const [latitude,setLatitude]=useState(0);
const [longitude,setLongitude]=useState(0)
const [stateLoader,setStateLoader]=useState(false);
const [cityLoader,setCityLoader]=useState(false)
const [state,setState]=useState("");
const [city,setCity]=useState("");
const [timezone,setTimezone]=useState("");
const [value,setValue]=useState([])

useEffect(() => {
GetCountries().then((result) => {
setCountriesList(result);
setValue(result.map(el=>({
    value:el.name,
    label:(<div className="option-wrapper">
    <img src={`https://purecatamphetamine.github.io/country-flag-icons/3x2/${el.iso2}.svg`}
        className='option-flag' />
    <p className='option-item'>{el.name}</p>
</div>)
})))
});

}, []);
async function getFinish() {
const data={
country:country,
state:state,
city:city,
timezone:timezone,
latitude:latitude,
longitude:longitude
}
setCurrentZone(data)
}
const filterOption = (input, option) =>
  (option?.value ?? '').toLowerCase().includes(input.toLowerCase());

return (
<Form className={className + " form"} style={{ maxWidth: maxWidth }} onFinish={getFinish}>
<div className="form__input-wrapper">
    <Form.Item style={{minWidth:200}}  name="country"  rules={[{ required: true, message: 'Iltimos, davlat nomini kiriting' }]}>
        <Select 
        showSearch 
        placeholder="Davlat" 
        maxTagCount={1} 
        filterOption={filterOption} 
        options={value}  
        optionFilterProp="children" 
        onChange={(value)=> { 
            const country = countryList.find(el=>el.name==value);
            //here you will get full country object.
            setCountryid(country.id);
            setCountry(country.name);
            setLatitude(country.latitude);
            setLongitude(country.longitude);
            console.log(country.capital);
            setTimezone(`${country.region}/${country.capital}`);
            setStateLoader(true)
            GetState(country.id).then((result) => {
            setStateList(result);
            setStateChange(false)
            setStateLoader(false)
            });
            }}
            >
        </Select>
    </Form.Item>
    </div>
    <div className="form__input-wrapper">
    <Form.Item style={{minWidth:200}} name="state" rules={[{ required: true, message: 'Iltimos, shahar nomini kiriting' }]}>
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
    <InputSpinner display={stateLoader} className="form__input-spinner"/>
    </div>
    <div className="form__input-wrapper">
    <Form.Item style={{minWidth:200}} name="city" >
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
    <InputSpinner display={cityLoader} className="form__input-spinner"/>
    </div>
    <Form.Item>
        <Button htmlType='submit' key="submit" className='form__button' type='dashed' >{buttonTitle}</Button>
    </Form.Item>
    
</Form>
)
}

export default FormSection