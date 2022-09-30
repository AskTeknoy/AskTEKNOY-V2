import React, { useMemo } from 'react'; 
import { GoogleMap, useLoadScript, Marker } from '@react-google-maps/api'; 

import '../styles/MapGoogle.css';

const MapGoogle = () => {

  const { isLoaded } = useLoadScript({ 
    googleMapsApiKey: "AIzaSyBjVHt2JjYCpHVzZOGfYjxdJVPLzkoB8jc", 
  })

  if(!isLoaded) return <div>Loading...</div>

  return (
    <Map />
  )
}

function Map(){
    const center = {lat: 44, lng: -80};

    return <GoogleMap zoom={15} center={center} mapContainerClassName="map-container"/>
}

export default MapGoogle