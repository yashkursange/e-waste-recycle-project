import React, { useState, useEffect } from 'react';
import { MapContainer, TileLayer, Marker, Polyline, useMap } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

// Fix default marker icon issue
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
});

// Custom truck icon for driver
const truckIcon = new L.Icon({
  iconUrl: 'data:image/svg+xml;base64,' + btoa(`
    <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#16a34a" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
      <path d="M14 18V6a2 2 0 0 0-2-2H4a2 2 0 0 0-2 2v11a1 1 0 0 0 1 1h2"/>
      <path d="M15 18H9"/>
      <path d="M19 18h2a1 1 0 0 0 1-1v-3.65a1 1 0 0 0-.22-.624l-3.48-4.35A1 1 0 0 0 17.52 8H14"/>
      <circle cx="17" cy="18" r="2"/>
      <circle cx="7" cy="18" r="2"/>
    </svg>
  `),
  iconSize: [32, 32],
  iconAnchor: [16, 16],
  popupAnchor: [0, -16],
});

// Custom home icon for user location
const homeIcon = new L.Icon({
  iconUrl: 'data:image/svg+xml;base64,' + btoa(`
    <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="#16a34a" stroke="#16a34a" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
      <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/>
      <polyline points="9 22 9 12 15 12 15 22"/>
    </svg>
  `),
  iconSize: [32, 32],
  iconAnchor: [16, 32],
  popupAnchor: [0, -32],
});

// Component to update map view when markers change
function ChangeView({ center, zoom }) {
  const map = useMap();
  useEffect(() => {
    map.setView(center, zoom);
  }, [center, zoom, map]);
  return null;
}

const LiveMap = ({ userLocation, driverLocation, autoUpdate = false }) => {
  const [currentDriverLocation, setCurrentDriverLocation] = useState(driverLocation);

  // Example animated movement (for demo)
  useEffect(() => {
    if (autoUpdate) {
      const interval = setInterval(() => {
        setCurrentDriverLocation((prev) => {
          // Simulate driver moving closer to user (small incremental movement)
          const latDiff = (userLocation.lat - prev.lat) * 0.05;
          const lngDiff = (userLocation.lng - prev.lng) * 0.05;
          
          return {
            lat: prev.lat + latDiff,
            lng: prev.lng + lngDiff,
          };
        });
      }, 3000); // Update every 3 seconds

      return () => clearInterval(interval);
    } else {
      setCurrentDriverLocation(driverLocation);
    }
  }, [autoUpdate, driverLocation, userLocation]);

  // Calculate center point between user and driver
  const centerLat = (userLocation.lat + currentDriverLocation.lat) / 2;
  const centerLng = (userLocation.lng + currentDriverLocation.lng) / 2;
  const center = [centerLat, centerLng];

  // Polyline path
  const polylinePositions = [
    [userLocation.lat, userLocation.lng],
    [currentDriverLocation.lat, currentDriverLocation.lng],
  ];

  return (
    <div className="bg-white dark:bg-slate-800 border border-transparent dark:border-slate-700 rounded-3xl shadow-lg p-6 sm:p-8 transition-colors duration-300">
      <h2 className="text-xl font-semibold text-gray-800 dark:text-white mb-6">Live Tracking</h2>
      
      <div 
        className="w-full rounded-2xl overflow-hidden shadow-md"
        style={{ 
          height: '400px',
          border: '1px solid #e5e7eb'
        }}
      >
        <MapContainer
          center={center}
          zoom={13}
          style={{ height: '100%', width: '100%' }}
          scrollWheelZoom={true}
        >
          <ChangeView center={center} zoom={13} />
          
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          
          {/* User location marker */}
          <Marker 
            position={[userLocation.lat, userLocation.lng]} 
            icon={homeIcon}
          />
          
          {/* Driver location marker */}
          <Marker 
            position={[currentDriverLocation.lat, currentDriverLocation.lng]} 
            icon={truckIcon}
          />
          
          {/* Polyline connecting user and driver */}
          <Polyline 
            positions={polylinePositions}
            pathOptions={{ 
              color: '#16a34a', 
              weight: 4,
              opacity: 0.7,
              dashArray: '10, 10',
            }}
          />
        </MapContainer>
      </div>
      
      {/* Distance info */}
      <div className="mt-4 p-4 bg-green-50 dark:bg-green-900/20 rounded-xl border border-green-200 dark:border-green-800 transition-colors duration-300">
        <p className="text-sm text-green-800 dark:text-green-300">
          <span className="font-semibold">Driver is en route</span> • Estimated arrival: 15 minutes
        </p>
      </div>
    </div>
  );
};

export default LiveMap;
