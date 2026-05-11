import { useEffect, useRef } from "react";
import * as signalR from "@microsoft/signalr";

export const useRequestHub = (requestId, handlers) => {
  const connectionRef = useRef(null);
  const ApiBase = "https://fixitnepal.onrender.com";

  useEffect(() => {
    if (!requestId) return;

  const connection = new signalR.HubConnectionBuilder()
.withUrl(`${ApiBase}/liveStatusHub?requestId=${requestId}`)
  .withAutomaticReconnect()
  .build();

    connectionRef.current = connection;

    connection.on("RequestStatusChange", (data) => {
      handlers?.onStatusChange?.(data);
    });
     //  LIVE LOCATION updates (THIS WAS MISSING)
    connection.on("ServiceProviderLocationUpdated", (data) => {
      handlers?.onLocationUpdate?.(data);
    });

    connection.onreconnecting(() => {
      console.log("Reconnecting...");
    });

    connection.onreconnected(() => {
      console.log("Reconnected");
    });

    connection.onclose(() => {
      console.log("Connection closed");
    });

    let stopped = false;

    const start = async () => {
      try {
        await connection.start();
        if (!stopped) {
          console.log("Connected to LiveRequestHub");
        }
      } catch (err) {
        console.error("Connection failed:", err);
      }
    };

    start();

    return () => {
      stopped = true;

      connection.stop().catch(() => {});
    };
  }, [requestId]);

  return connectionRef.current;
};