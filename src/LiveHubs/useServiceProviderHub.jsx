import { useEffect, useRef } from "react";
import * as signalR from "@microsoft/signalr";

export const useServiceProviderHub = (serviceProviderId, handlers) => {
  const connectionRef = useRef(null);
  const ApiBase = "https://fixitnepal.onrender.com";

  useEffect(() => {
    if (!serviceProviderId) return;

    const connection = new signalR.HubConnectionBuilder()
      .withUrl(`${ApiBase}/liveServiceProviderHub?serviceProviderId=${serviceProviderId}`)
      .withAutomaticReconnect()
      .build();

    connectionRef.current = connection;

    //  Request status updates
    connection.on("ServiceProviderRequestStatusChange", (data) => {
      handlers?.onStatusChange?.(data);
    });

    //  LIVE LOCATION updates (THIS WAS MISSING)
    connection.on("ServiceProviderLocationUpdated", (data) => {
      handlers?.onLocationUpdate?.(data);
    });

    connection.onreconnecting(() => console.log("Reconnecting..."));
    connection.onreconnected(() => console.log("Reconnected"));
    connection.onclose(() => console.log("Connection closed"));

    let stopped = false;

    const start = async () => {
      try {
        await connection.start();
        if (!stopped) console.log("Connected to LiveServiceProviderHub");
      } catch (err) {
        console.error("Connection failed:", err);
      }
    };

    start();

    return () => {
      stopped = true;
      connection.stop().catch(() => {});
    };
  }, [serviceProviderId]);

  return connectionRef;
};