import { MapContainer, TileLayer, Marker, useMapEvents } from "react-leaflet";
import { useState } from "react";

function LocationMarker({ setFieldValue }) {
  const [position, setPosition] = useState(null);

  useMapEvents({
    click(e) {
      const { lat, lng } = e.latlng;

      setPosition([lat, lng]);

      setFieldValue("address.locationCoordinatePoint.latitude", lat);
      setFieldValue("address.locationCoordinatePoint.longitude", lng);
    },
  });

  return position ? <Marker position={position} /> : null;
}

export default function MapPicker({ formik }) {
  return (
    <div className="h-[300px] w-full rounded-xl overflow-hidden border">
      <MapContainer
        center={[27.7172, 85.324]} // default Nepal
        zoom={13}
        className="h-full w-full"
      >
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <LocationMarker setFieldValue={formik.setFieldValue} />
      </MapContainer>
    </div>
  );
}