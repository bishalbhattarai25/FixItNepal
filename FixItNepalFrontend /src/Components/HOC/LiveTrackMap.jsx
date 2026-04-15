import { MapContainer, TileLayer, Marker, Polyline, Popup, useMap } from "react-leaflet";
import { useEffect } from "react";

// 👇 auto recenter map when positions change
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
  role = "user",
}) => {
  const userLatLng =
    userLocation?.latitude
      ? [userLocation.latitude, userLocation.longitude]
      : userLocation;

  const mechLatLng =
    mechanicLocation?.latitude
      ? [mechanicLocation.latitude, mechanicLocation.longitude]
      : mechanicLocation;

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
        <Polyline positions={[mechLatLng, userLatLng]} color="blue" />
      )}
    </MapContainer>
  );
};

export default LiveTrackMap;