import { useEffect, useRef } from "react";
import { HubConnectionState } from "@microsoft/signalr";

export const useLocationSender = (connectionRef, requestId, serviceProviderId, isTracking) => {
  const intervalRef = useRef(null);

  useEffect(() => {
    if (!isTracking || !requestId)
    {
          console.log(" Location Sender STOPPED", { isTracking, requestId });
          return;
    }
      
 const sendLocation = () => {
  console.log("📡 sendLocation CALLED");

  const connection = connectionRef.current;

  if (!connection) {
    console.log("❌ No connectionRef");
    return;
  }

  console.log("🔌 Connection state:", connection.state);

  if (connection.state !== HubConnectionState.Connected) {
    console.log("❌ Not connected yet");
    return;
  }

  navigator.geolocation.getCurrentPosition(
    (position) => {
      console.log("📍 GPS:", position.coords.latitude, position.coords.longitude);

      connection.invoke("UpdateLocation", {
        requestId,
        serviceProviderId,
        latitude: position.coords.latitude,
        longitude: position.coords.longitude,
        bearing: position.coords.heading ?? null,
        timestamp: new Date().toISOString(),
      })
      .then(() => console.log("✅ Location sent to server"))
      .catch((err) => console.error("❌ UpdateLocation failed:", err));
    },
    (err) => console.error("❌ Geolocation error:", err),
    { enableHighAccuracy: true }
  );
};

    sendLocation();                                    // send immediately on start
    intervalRef.current = setInterval(sendLocation, 4000); // then every 4 seconds

    return () => clearInterval(intervalRef.current);
  }, [isTracking, requestId]);
};