import React, { useState, useEffect } from 'react';
import { GoogleMap, LoadScript, MarkerF, InfoWindowF } from '@react-google-maps/api';
import { searchRestaurants } from '../services/restaurantService';
import '../styles/Map.css';

const API_KEY = process.env.REACT_APP_GOOGLE_MAPS_API_KEY;

const DEFAULT_CENTER = { lat: 40.7128, lng: -74.0060 }; // New York fallback

const mapContainerStyle = {
  width: '100%',
  height: '100%',
};

function Map() {
  const [center, setCenter] = useState(DEFAULT_CENTER);
  const [restaurants, setRestaurants] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedRestaurant, setSelectedRestaurant] = useState(null);

  useEffect(() => {
    // Get user's current location
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const userLocation = {
            lat: position.coords.latitude,
            lng: position.coords.longitude,
          };
          setCenter(userLocation);
          fetchRestaurants(userLocation);
        },
        (error) => {
          console.warn('Geolocation error:', error);
          // Fall back to New York if permission denied
          fetchRestaurants(DEFAULT_CENTER);
        }
      );
    } else {
      // Geolocation not supported
      fetchRestaurants(DEFAULT_CENTER);
    }
  }, []);

  const fetchRestaurants = async (location) => {
    try {
      setLoading(true);
      setError(null);
      const results = await searchRestaurants(location.lat, location.lng);
      setRestaurants(results);
      console.log(`Found ${results.length} restaurants at ${location.lat}, ${location.lng}`);
    } catch (err) {
      console.error('Failed to fetch restaurants:', err);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  if (!API_KEY) {
    return (
      <div className="error-message">
        ❌ Error: Google Maps API key not configured
      </div>
    );
  }

  if (error) {
    return (
      <div className="error-message">
        ❌ Error: {error}
      </div>
    );
  }

  return (
    <div className="map-page">
      {loading && <div className="loading-overlay">Searching restaurants...</div>}
      
      <LoadScript googleMapsApiKey={API_KEY}>
        <GoogleMap
          mapContainerStyle={mapContainerStyle}
          center={center}
          zoom={13}
        >
          {/* Numbered markers for each restaurant */}
          {restaurants.map((restaurant) => (
            <MarkerF
              key={restaurant.id}
              position={{ lat: restaurant.lat, lng: restaurant.lng }}
              title={restaurant.name}
              label={{
                text: String(restaurant.number),
                color: 'white',
                fontSize: '14px',
                fontWeight: 'bold',
              }}
              onClick={() => setSelectedRestaurant(restaurant)}
              icon={{
                path: 'M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2z',
                fillColor: '#E53935',
                fillOpacity: 1,
                strokeColor: '#fff',
                strokeWeight: 2,
                scale: 1.5,
              }}
            >
              {selectedRestaurant?.id === restaurant.id && (
                <InfoWindowF onCloseClick={() => setSelectedRestaurant(null)}>
                  <div className="info-window">
                    <h3>{restaurant.name}</h3>
                    <p>⭐ {restaurant.rating} ({restaurant.reviews} reviews)</p>
                    <p>{restaurant.address}</p>
                  </div>
                </InfoWindowF>
              )}
            </MarkerF>
          ))}
        </GoogleMap>
      </LoadScript>
    </div>
  );
}

export default Map;
