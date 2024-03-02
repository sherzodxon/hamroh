import { Input } from 'antd'
import React, { forwardRef } from 'react'

const SearchInput=forwardRef(function(props,ref) {
    return (
     <div className="search-input" style={{maxWidth:props.maxWidth}}>
        <Input ref={ref} onChange={props.onChange} placeholder={props.placeholder} type={props.type}/>
     </div>
    )
})

export default SearchInput