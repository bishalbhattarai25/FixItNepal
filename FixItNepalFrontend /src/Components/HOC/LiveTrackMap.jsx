import {
  MapContainer,
  TileLayer,
  Marker,
  Polyline,
  Popup,
  useMap
} from "react-leaflet";
import { useEffect, useState } from "react";
import { getDistance } from "geolib";

/* -------------------------
   Smooth map recenter
--------------------------*/
const RecenterMap = ({ center }) => {
  const map = useMap();

  useEffect(() => {
    if (center) {
      map.flyTo(center, map.getZoom(), {
        animate: true,
        duration: 1
      });
    }
  }, [center, map]);

  return null;
};

/* -------------------------
   OSRM route fetch
--------------------------*/
const fetchRoute = async (start, end) => {
  const res = await fetch(
    `https://router.project-osrm.org/route/v1/driving/` +
      `${start[1]},${start[0]};${end[1]},${end[0]}?overview=full&geometries=geojson`
  );

  const data = await res.json();

  if (!data.routes?.length) return [];

  return data.routes[0].geometry.coordinates.map((c) => [
    c[1],
    c[0]
  ]);
};

/* -------------------------
   Main Component
--------------------------*/
const LiveTrackMap = ({ userLocation, mechanicLocation, role }) => {
  const [route, setRoute] = useState([]);

  const isValid = (loc) =>
    Array.isArray(loc) &&
    loc.length === 2 &&
    typeof loc[0] === "number" &&
    typeof loc[1] === "number" &&
    !isNaN(loc[0]) &&
    !isNaN(loc[1]);

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

  /* -------------------------
     CENTER LOGIC
  --------------------------*/
  const center =
    role === "ServiceProvider"
      ? mechLatLng || userLatLng
      : userLatLng || mechLatLng;

  /* -------------------------
     ROUTE UPDATE
  --------------------------*/
  useEffect(() => {
    const loadRoute = async () => {
      if (!userLatLng || !mechLatLng) return;

      const path = await fetchRoute(mechLatLng, userLatLng);
      setRoute(path);
    };

    loadRoute();
  }, [userLatLng, mechLatLng]);

  /* -------------------------
     DISTANCE + ETA
  --------------------------*/
  const distanceKm =
    userLatLng && mechLatLng
      ? (
          getDistance(
            {
              latitude: mechLatLng[0],
              longitude: mechLatLng[1]
            },
            {
              latitude: userLatLng[0],
              longitude: userLatLng[1]
            }
          ) / 1000
        ).toFixed(2)
      : null;

  const etaMin = distanceKm ? Math.round(distanceKm / 0.4) : null;

  const arrivingText = !etaMin
    ? "Waiting for location..."
    : etaMin <= 1
    ? "Arriving now"
    : `Arriving in ${etaMin} min`;

  /* -------------------------
     UI fallback
  --------------------------*/
  if (!center) {
    return (
      <div className="p-4 text-center text-gray-500">
        Waiting for live location...
      </div>
    );
  }

  /* -------------------------
     MAP UI
  --------------------------*/
  return (
    <div className="relative w-full h-full">

      {/* LIVE INFO PANEL */}
      {distanceKm && (
        <div className="absolute top-4 left-4 z-[999] bg-white px-3 py-2 rounded-lg shadow">
          <div className="text-sm font-bold">
            {distanceKm} km away
          </div>
          <div className="text-xs text-gray-500">
            {arrivingText}
          </div>
        </div>
      )}

      <MapContainer
        center={center}
        zoom={14}
        style={{ height: "100%", width: "100%" }}
      >
        <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />

        {/* Smooth camera follow */}
        <RecenterMap center={center} />

        {/* CUSTOMER */}
        {userLatLng && (
          <Marker position={userLatLng}>
            <Popup>Customer</Popup>
          </Marker>
        )}

        {/* MECHANIC */}
        {mechLatLng && (
          <Marker position={mechLatLng}>
            <Popup>Mechanic</Popup>
          </Marker>
        )}

        {/* REAL ROUTE */}
        {route.length > 0 && (
          <Polyline
            positions={route}
            color="blue"
            weight={4}
          />
        )}
      </MapContainer>
    </div>
  );
};

export default LiveTrackMap;