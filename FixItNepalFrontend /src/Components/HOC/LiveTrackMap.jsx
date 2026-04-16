import { MapContainer, TileLayer, Marker, Polyline, Popup, useMap } from "react-leaflet";
import { useEffect } from "react";


const RecenterMap = ({ center }) => {
  const map = useMap();

  useEffect(() => {
    if (center) {
      map.setView(center, map.getZoom());
    }
  }, [center]);

  return null;
};

const LiveTrackMap = ({
  userLocation,
  mechanicLocation,
  role
}) => {
 const isValid = (loc) =>
  Array.isArray(loc) && loc.length === 2 && !isNaN(loc[0]) && !isNaN(loc[1]);

const userLatLng =
  userLocation?.latitude !== undefined
    ? [userLocation.latitude, userLocation.longitude]
    : isValid(userLocation)
    ? userLocation
    : null;

const mechLatLng =
  mechanicLocation?.latitude !== undefined
    ? [mechanicLocation.latitude, mechanicLocation.longitude]
    : isValid(mechanicLocation)
    ? mechanicLocation
    : null;

  const center =
    role === "ServiceProvider"
      ? mechLatLng || userLatLng
      : userLatLng || mechLatLng;

  if (!center || center.length !== 2) {
    return (
      <div className="p-4 text-center text-gray-500">
        Waiting for live location...
      </div>
    );
  }

  return (
    <MapContainer
      center={center}
      zoom={14}
      style={{ height: "100%", width: "100%" }}
    >
      <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />

      <RecenterMap center={center} />

      {/* Customer marker */}
      {userLatLng && (
        <Marker position={userLatLng}>
          <Popup>Customer</Popup>
        </Marker>
      )}

      {/* Mechanic marker */}
      {mechLatLng && (
        <Marker position={mechLatLng}>
          <Popup>Mechanic</Popup>
        </Marker>
      )}

      {/* Route line */}
      {userLatLng && mechLatLng && (
   <Polyline
  positions={[mechLatLng, userLatLng]}
  pathOptions={{ color: "blue", weight: 4 }}
/>
      )}
    </MapContainer>
  );
};

export default LiveTrackMap;