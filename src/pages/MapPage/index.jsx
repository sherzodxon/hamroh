import React from 'react'
import './index.scss'
import PageControl from '../../assets/components/PageControl'
import Title from '../../assets/components/Title'
import { useCurrentZone } from '../../contexts/context'
import Search from '../../assets/components/Search'
function Map() {
const {currentZone}=useCurrentZone()
    return (
        <div className="map-page">
            <div className="map-page__container container">
                  <div className="map-page__header">
                  <PageControl next="/"/>
                  <h3 className="map-page__country">{currentZone.country}</h3>
                  <Search className="map-page__search"/>
                  </div>
                  <div className="map-page__body">
                  <iframe className='map-page__iframe' src={`https://maps.google.com/maps?q=${currentZone.latitude}, ${currentZone.longitude}&output=embed`} ></iframe> 
                  </div>
            </div>
        </div>
    )
}

export default Map