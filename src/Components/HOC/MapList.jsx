import L from 'leaflet';




export const MapData = [
    {
        geocode: [27.629102, 83.477831],
        popup: "MY LOCATION",
        type: "user"
    },
    {
        geocode: [27.629232, 83.473220],
        popup: "Garage ",
        type: "garage"
    },
    {
        geocode: [27.627685, 83.473276],
        popup: "machine",
        type: "garage"
    }
];


// Blue icon for You
export const userIcon = new L.Icon({
  iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-blue.png',
  iconSize: [25, 41],
  iconAnchor: [12, 41]
});

// Red icon for Garages
export const garageIcon = new L.Icon({
  iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-red.png',
  iconSize: [25, 41],
  iconAnchor: [12, 41]
});