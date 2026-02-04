import React, { useState } from 'react';
import { GoogleMap, LoadScript, MarkerF } from '@react-google-maps/api';
import '../styles/Map.css';

const API_KEY = process.env.REACT_APP_GOOGLE_MAPS_API_KEY;

const DEFAULT_CENTER = { lat: 40.7128, lng: -74.0060 }; // New York

const mapContainerStyle = {
  width: '100%',
  height: '100%',
};

function Map() {
  const [center] = useState(DEFAULT_CENTER);

  if (!API_KEY) {
    return (
      <div className="error-message">
        ❌ Error: Google Maps API key not configured
      </div>
    );
  }

  return (
    <div className="map-page">
      <LoadScript googleMapsApiKey={API_KEY}>
        <GoogleMap
          mapContainerStyle={mapContainerStyle}
          center={center}
          zoom={13}
        >
          <MarkerF position={center} title="New York" />
        </GoogleMap>
      </LoadScript>
    </div>
  );
}

export default Map;
