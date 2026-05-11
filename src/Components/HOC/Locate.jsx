import React from "react";
import { useEffect } from "react";
import { useMap } from "react-leaflet";

const Locate = () => {
  const map = useMap();

  useEffect(() => {

    if (!navigator.geolocation) {
      console.log("Geolocation is not supported by browser");
      return;
    }

    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords;
        // Move the map to the user's location
        map.flyTo([latitude, longitude], 14);
      },
      () => {
        console.log("Unable to retrieve location");
      },
    );
  }, [map]);

  return null; 
};

export default Locate;
