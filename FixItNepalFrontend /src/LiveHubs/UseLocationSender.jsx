import { useEffect, useRef } from "react";

export const useLocationSender = (connectionRef, requestId, serviceProviderId, isTracking) => {
  const intervalRef = useRef(null);

  useEffect(() => {
    if (!isTracking || !requestId) return;

    const sendLocation = () => {
      const connection = connectionRef.current;

      if (!connection || connection.state !== "Connected") return;

      navigator.geolocation.getCurrentPosition(
        (position) => {
          connection.invoke("UpdateLocation", {
            requestId,
            serviceProviderId,
            latitude: position.coords.latitude,
            longitude: position.coords.longitude,
            bearing: position.coords.heading ?? null,
            timestamp: new Date().toISOString(),
          }).catch((err) => console.error("UpdateLocation failed:", err));
        },
        (err) => console.error("Geolocation error:", err),
        { enableHighAccuracy: true }
      );
    };

    sendLocation();                                    // send immediately on start
    intervalRef.current = setInterval(sendLocation, 4000); // then every 4 seconds

    return () => clearInterval(intervalRef.current);
  }, [isTracking, requestId]);
};