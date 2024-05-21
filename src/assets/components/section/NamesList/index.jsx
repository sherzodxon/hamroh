import React from 'react'
import NamesCard from '../../NamesCard'
import './index.scss'

function NamesList({data,refetch}) {
    
    
    return (
        <ul className='names-list' >
          {
            data.map(el=><NamesCard refetch={refetch}  key={el.id} id={el.id} name={el.name} text={el.comment} like={el.isLiked}/>)
          }
        </ul>
    )
}

export default NamesList
