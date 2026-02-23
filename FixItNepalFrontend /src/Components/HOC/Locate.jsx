import React from 'react'
import { useEffect } from 'react';
import { useMap } from 'react-leaflet';

const Locate = () => {

    const map = useMap();

  useEffect(() => {
    // Check if browser supports Geolocation
    if (!navigator.geolocation) {
      console.log("Geolocation is not supported by your browser");
      return;
    }

    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords;
        // Move the map to the user's location
        map.flyTo([latitude, longitude], 14);
      },
      () => {
        console.log("Unable to retrieve your location");
      }
    );
  }, [map]);

  return null; // This component doesn't need to render anything itself
};


export default Locate