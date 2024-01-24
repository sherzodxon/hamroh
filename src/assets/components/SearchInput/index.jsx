import { Input } from 'antd'
import React from 'react'

function SearchInput({maxWidth,onChange,placeholder="Qidirish",type="text"}) {
    return (
     <div className="search-input" style={{maxWidth:maxWidth}}>
        <Input  onChange={onChange} placeholder={placeholder} type={type}/>
     </div>
    )
}

export default SearchInput