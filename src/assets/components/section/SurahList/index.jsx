import React from 'react'
import SurahCard from '../../SurahCard';
import './index.scss'
function SurahList({data}) {
    
    //   return (
    //     <div>
    //       <h2>Posts</h2>
    //       <ul>
    //         {posts.map((post) => (
    //           <div className="">
    //             <li key={post.id}>{`${post.isPlay}`}</li>
    //             <button onClick={()=>dispatch(play(post.id))}>play</button>
    //           </div>
    //         ))}
    //       </ul>
    //     </div>
    //   );
    return (
        <ul className='surah-list'>
           {
            data.map((element)=>
                <SurahCard key={element.id} number={element.number} textArab={element.name} textUzb={element.nameUz} />
            )
           }
        </ul>
    )
}

export default SurahList
