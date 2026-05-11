
/**
 * Estimate ETA in minutes based on distance (km)
 * Default speed: 30 km/h ≈ 0.5 km/min
 */
export const getEtaMinutes = (distanceKm, speedKmPerHour = 30) => {
  if (!distanceKm || isNaN(distanceKm)) return null;

  const speedKmPerMin = speedKmPerHour / 60;
  const eta = distanceKm / speedKmPerMin;

  return Math.max(1, Math.round(eta));
};

/**
 * Human readable ETA text
 */
export const getEtaText = (etaMin) => {
  if (!etaMin) return "Waiting for location...";
  if (etaMin <= 1) return "Arriving now";
  return `Arriving in ${etaMin} min`;
};