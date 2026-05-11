import React from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";

// FIX default icon issue (still needed internally)
import markerShadow from "leaflet/dist/images/marker-shadow.png";

/* ================= ICON GENERATOR ================= */

const createLogoIcon = (url, isSelected) =>
  new L.DivIcon({
    className: "",
    html: `
      <div style="
        width:${isSelected ? 60 : 45}px;
        height:${isSelected ? 60 : 45}px;
        border-radius:50%;
        border:3px solid ${isSelected ? "#22c55e" : "#ef4444"};
        overflow:hidden;
        background:white;
        box-shadow:0 4px 10px rgba(0,0,0,0.2);
        display:flex;
        align-items:center;
        justify-content:center;
      ">
        <img 
          src="${url || "https://ui-avatars.com/api/?name=Service"}" 
          style="width:100%; height:100%; object-fit:cover;"
        />
      </div>
    `,
    iconSize: [60, 60],
    iconAnchor: [30, 30],
  });

/* ================= MAP ================= */

export const NearbyMap = ({
  garages,
  mechanics,
  selectedProvider,
  onSelectProvider,
}) => {
  const center = garages[0] || mechanics[0];

  return (
    <MapContainer
      center={[
        center?.latitude || 27.7172,
        center?.longitude || 85.3240,
      ]}
      zoom={13}
      style={{ height: "100%", width: "100%" }}
    >
      <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />

      {/* ================= GARAGES ================= */}
      {garages.map((g) => (
        <Marker
          key={g.id}
          position={[g.latitude, g.longitude]}
          icon={createLogoIcon(
            g.logo?.accessUrl,
            selectedProvider?.id === g.id
          )}
          eventHandlers={{
            click: () => onSelectProvider({ ...g, type: "Garage" }),
          }}
        >
          <Popup>
            <b>{g.name}</b>
            <br />
            🏢 Garage
            <br />
            {g.city}
          </Popup>
        </Marker>
      ))}

      {/* ================= MECHANICS ================= */}
      {mechanics.map((m) => (
        <Marker
          key={m.id}
          position={[m.latitude, m.longitude]}
          icon={createLogoIcon(
            m.logo?.accessUrl,
            selectedProvider?.id === m.id
          )}
          eventHandlers={{
            click: () => onSelectProvider({ ...m, type: "Mechanic" }),
          }}
        >
          <Popup>
            <b>{m.name}</b>
            <br />
            🔧 Mechanic
            <br />
            {m.city}
          </Popup>
        </Marker>
      ))}
    </MapContainer>
  );
};