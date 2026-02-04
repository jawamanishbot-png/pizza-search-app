import React, { useState, useEffect } from 'react';
import { GoogleMap, LoadScript, MarkerF } from '@react-google-maps/api';
import { searchRestaurants } from '../services/restaurantService';
import RestaurantDetailSheet from '../components/RestaurantDetailSheet';
import RestaurantCardCarousel from '../components/RestaurantCardCarousel';
import '../styles/Map.css';

const API_KEY = process.env.REACT_APP_GOOGLE_MAPS_API_KEY;

function Map() {
  const [center, setCenter] = useState({ lat: 40.7128, lng: -74.0060 });
  const [restaurants, setRestaurants] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [selectedRestaurant, setSelectedRestaurant] = useState(null);
  const [showCarousel, setShowCarousel] = useState(false);

  useEffect(() => {
    // Only get user location, don't search
    const getLocation = () => {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
          (position) => {
            const loc = {
              lat: position.coords.latitude,
              lng: position.coords.longitude,
            };
            setCenter(loc);
          },
          (err) => {
            console.warn('Location error:', err);
            // Default location stays set
          }
        );
      }
    };

    getLocation();
  }, []);

  const handleRedoSearch = async () => {
    try {
      setLoading(true);
      setError(null);
      const results = await searchRestaurants(center.lat, center.lng);
      setRestaurants(results);
      setShowCarousel(true); // Show carousel with cards
      setSelectedRestaurant(null);
    } catch (err) {
      console.error('Error:', err);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  if (!API_KEY) {
    return <div className="error-message">❌ API key not configured</div>;
  }

  if (error) {
    return <div className="error-message">❌ {error}</div>;
  }

  const mapStyle = { width: '100%', height: '100%' };

  return (
    <div className="map-page">
      {loading && <div className="loading-overlay">Loading restaurants...</div>}

      {/* Redo Search Button */}
      {!loading && (
        <button className="redo-search-btn" onClick={handleRedoSearch}>
          🔍 Redo Search In This Area
        </button>
      )}

      <LoadScript googleMapsApiKey={API_KEY}>
        <GoogleMap mapContainerStyle={mapStyle} center={center} zoom={13}>
          {/* Your location (blue) */}
          <MarkerF
            position={center}
            title="Your Location"
            icon={{
              path: 'M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2z',
              fillColor: '#4285F4',
              fillOpacity: 1,
              strokeColor: '#fff',
              strokeWeight: 2,
              scale: 1.2,
            }}
          />

          {/* Restaurant markers (red with numbers) */}
          {restaurants.map((r) => (
            <MarkerF
              key={r.id}
              position={{ lat: r.lat, lng: r.lng }}
              title={r.name}
              label={{
                text: String(r.number),
                color: 'white',
                fontSize: '14px',
                fontWeight: 'bold',
              }}
              icon={{
                path: 'M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2z',
                fillColor: '#E53935',
                fillOpacity: 1,
                strokeColor: '#fff',
                strokeWeight: 2,
                scale: 1.5,
              }}
              onClick={() => {
                setSelectedRestaurant(r);
                setShowCarousel(true);
              }}
            />
          ))}
        </GoogleMap>
      </LoadScript>

      {/* Restaurant Card Carousel */}
      {restaurants.length > 0 && showCarousel && !selectedRestaurant && (
        <RestaurantCardCarousel
          restaurants={restaurants}
          onCardClick={setSelectedRestaurant}
          onDismiss={() => setShowCarousel(false)}
        />
      )}

      {/* Restaurant Detail Sheet */}
      {selectedRestaurant && showCarousel && (
        <RestaurantDetailSheet
          restaurant={selectedRestaurant}
          onClose={() => setSelectedRestaurant(null)}
        />
      )}
    </div>
  );
}

export default Map;
