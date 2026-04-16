// utils/geoDistanceHelper.js
import { getDistance } from "geolib";

/**
 * Calculate distance between two [lat, lng] points in KM
 */
export const getDistanceKm = (from, to) => {
  if (!isValid(from) || !isValid(to)) return null;

  const meters = getDistance(
    { latitude: from[0], longitude: from[1] },
    { latitude: to[0], longitude: to[1] }
  );

  return (meters / 1000).toFixed(2);
};

/**
 * Validate coordinate format [lat, lng]
 */
export const isValid = (loc) =>
  Array.isArray(loc) &&
  loc.length === 2 &&
  !isNaN(loc[0]) &&
  !isNaN(loc[1]);