import React from 'react'
import SurahCard from '../../SurahCard'

function BookList({data}) {
    return (
        <ul className='book-list'>
           {
            data.map((element)=>
                <SurahCard key={element.id} number={element.number} textArab={element.name} textUzb={element.nameUz} />
            )
           }
        </ul>
    )
}

export default BookList
