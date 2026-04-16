import { useEffect, useRef } from "react";
import { HubConnectionState } from "@microsoft/signalr";

export const useLocationSender = (
  connectionRef,
  requestId,
  serviceProviderId,
  isTracking
) => {
  const intervalRef = useRef(null);

  useEffect(() => {
    if (!isTracking || !requestId) return;

    intervalRef.current = setInterval(() => {
      const connection = connectionRef.current;

      console.log("📡 checking connection:", connection?.state);

      if (!connection || connection.state !== HubConnectionState.Connected) return;

      navigator.geolocation.getCurrentPosition((pos) => {
        console.log("📍 sending location");

        connection.invoke("UpdateLocation", {
           requestId: requestId,
          serviceProviderId: serviceProviderId,
          longitude: pos.coords.longitude,
          latitude: pos.coords.latitude,
          timestamp: new Date().toISOString()
        });
      });
    }, 4000);

    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [isTracking, requestId, serviceProviderId]);
};