import React from 'react'
import FormSection from '../section/FormSection'
import './index.scss'
import { useState } from 'react'
function Search({className}) {
    const [active,setActive]=useState(false)
    return (
        <div className='search'>
          <button onClick={()=>{setActive(!active)}} className={active?`search__button--close ${className}`:`search__button ${className}`}>
            </button>
            <div className={active?"search__wrapper--active":"search__wrapper"}>
                    <FormSection className={"search__form"} maxWidth={300} buttonTitle="Yuborish"/>
            </div>
        </div>
    )
}

export default Search
