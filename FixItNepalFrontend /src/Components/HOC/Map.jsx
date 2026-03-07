import React from 'react'
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet'
import "leaflet/dist/leaflet.css";
import { MapData } from './MapList'
import Locate from './Locate';
import { userIcon, garageIcon } from './MapList';
export const Map = () => {
  return (
    <div className="h-full w-full rounded-2xl overflow-hidden z-0">
      <MapContainer
        className="h-full w-full"
        center={[27.630841, 83.475383]}
        zoom={13}
        scrollWheelZoom={true}
      >
        <TileLayer
          attribution='&copy; OpenStreetMap contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <Locate />

        {MapData.map((loc, index) => (
  <Marker 
    key={index} 
    position={loc.geocode} 
    // If the text is "MY LOCATION", use blue. Otherwise, use red.
    icon={loc.popup === "MY LOCATION" ? userIcon : garageIcon}
  >
    <Popup>{loc.popup}</Popup>
  </Marker>
))}
      </MapContainer>
    </div>
  );
};

