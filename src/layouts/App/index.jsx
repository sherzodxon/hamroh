import React from 'react'
import Header from '../components/Header'
import Sidebar from '../components/Sidebar'
import { Route, Routes } from 'react-router-dom'
import { routes } from '../../pages/routeConfig'
import AudioPlayer from '../../assets/components/AudioPlayer'


function AppLayout() {
    return (
        <>
       <Header/>
         <main className='app__main'>
         <Sidebar/>
          <div className="app__body">
            <Routes>
            {routes.map(({ id, ...route }) => (
            <Route key={id} {...route} />
            ))}
            </Routes>
            <AudioPlayer/>
          </div>
         </main>
        
        </>
    )
}

export default AppLayout
