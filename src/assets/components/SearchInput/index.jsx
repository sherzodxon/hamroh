import { Input } from 'antd'
import React, { forwardRef } from 'react'
import './index.scss'

const SearchInput=forwardRef(function(props,ref) {
    return (
     <div className="search-input" >
        <Input className='search-input__input' ref={ref} onChange={props.onChange} placeholder={props.placeholder} type={props.type} defaultValue={props.defaultValue}/>
     </div>
    )
})

export default SearchInput