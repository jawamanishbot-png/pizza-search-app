import React, { useState, useEffect, useRef } from 'react';
import { GoogleMap, LoadScript, MarkerF } from '@react-google-maps/api';
import { searchRestaurants } from '../services/restaurantService';
import RestaurantDetailSheetV2 from '../components/RestaurantDetailSheetV2';
import RestaurantCardCarousel from '../components/RestaurantCardCarousel';
import RestaurantListSheet from '../components/RestaurantListSheet';
import '../styles/Map.css';

const API_KEY = process.env.REACT_APP_GOOGLE_MAPS_API_KEY;

function Map() {
  const [center, setCenter] = useState({ lat: 40.7128, lng: -74.0060 });
  const [restaurants, setRestaurants] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [selectedRestaurant, setSelectedRestaurant] = useState(null);
  const [showCarousel, setShowCarousel] = useState(false);
  const [showListSheet, setShowListSheet] = useState(false);
  const [focusedRestaurant, setFocusedRestaurant] = useState(null);
  const [filters, setFilters] = useState({
    sortBy: null,
    openNow: false,
    priceLevel: null,
    takeout: false,
  });
  const mapRef = useRef(null);

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

  // Auto-center map on focused restaurant as carousel scrolls
  useEffect(() => {
    if (focusedRestaurant && showCarousel && mapRef.current) {
      const newCenter = {
        lat: focusedRestaurant.lat,
        lng: focusedRestaurant.lng,
      };
      setCenter(newCenter);
      // Pan with animation
      if (mapRef.current.panTo) {
        mapRef.current.panTo(newCenter);
      }
    }
  }, [focusedRestaurant, showCarousel]);

  const applyFilters = (restaurantList, filterSettings) => {
    let filtered = [...restaurantList];

    // Open Now filter
    if (filterSettings.openNow) {
      filtered = filtered.filter(r => r.isOpen !== false);
    }

    // Price Level filter
    if (filterSettings.priceLevel) {
      const priceNum = filterSettings.priceLevel === '$' ? 1 : 
                       filterSettings.priceLevel === '$$' ? 2 : 
                       filterSettings.priceLevel === '$$$' ? 3 : 4;
      filtered = filtered.filter(r => (r.priceLevel || 2) === priceNum);
    }

    // Takeout filter
    if (filterSettings.takeout) {
      filtered = filtered.filter(r => r.takeout !== false && r.dineIn !== true);
    }

    // Sort
    if (filterSettings.sortBy === 'rating') {
      filtered.sort((a, b) => (b.rating || 0) - (a.rating || 0));
    } else if (filterSettings.sortBy === 'distance') {
      filtered.sort((a, b) => (a.distance || 0) - (b.distance || 0));
    }

    return filtered;
  };

  const handleRedoSearch = async () => {
    try {
      setLoading(true);
      setError(null);
      const results = await searchRestaurants(center.lat, center.lng);
      setRestaurants(results); // Keep all for filtering
      setShowListSheet(true); // Show list sheet, not carousel
      setShowCarousel(false);
      setSelectedRestaurant(null);
    } catch (err) {
      console.error('Error:', err);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleFilterChange = (newFilters) => {
    setFilters(newFilters);
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
        <GoogleMap 
          mapContainerStyle={mapStyle} 
          center={center} 
          zoom={13}
          onLoad={(map) => {
            mapRef.current = map;
          }}
        >
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
          {restaurants.map((r) => {
            const isFocused = focusedRestaurant?.id === r.id;
            const markerColor = isFocused ? '#667eea' : '#E53935'; // Blue for focused, red for others
            const markerScale = isFocused ? 1.8 : 1.5; // Larger when focused

            return (
              <MarkerF
                key={r.id}
                position={{ lat: r.lat, lng: r.lng }}
                title={r.name}
                label={{
                  text: String(r.number),
                  color: 'white',
                  fontSize: 16,
                  fontWeight: 'bold',
                }}
                icon={{
                  path: 'M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2z',
                  fillColor: markerColor,
                  fillOpacity: 1,
                  strokeColor: '#fff',
                  strokeWeight: isFocused ? 3 : 2,
                  scale: markerScale,
                }}
                onClick={() => {
                  setFocusedRestaurant(r);
                  setShowCarousel(true);
                  setSelectedRestaurant(null); // Show carousel, not detail sheet
                }}
              />
            );
          })}
        </GoogleMap>
      </LoadScript>

      {/* List Sheet (from Redo Search) */}
      {restaurants.length > 0 && showListSheet && (
        <RestaurantListSheet
          restaurants={applyFilters(restaurants, filters)}
          filters={filters}
          onFilterChange={handleFilterChange}
          onCardClick={(r) => {
            setSelectedRestaurant(r);
            setFocusedRestaurant(r);
            setShowCarousel(true);
            setShowListSheet(false);
          }}
          onClose={() => setShowListSheet(false)}
        />
      )}

      {/* Carousel (from clicking marker) */}
      {restaurants.length > 0 && showCarousel && !selectedRestaurant && (
        <RestaurantCardCarousel
          restaurants={applyFilters(restaurants, filters)}
          onCardClick={setSelectedRestaurant}
          onDismiss={() => setShowCarousel(false)}
          onFocusedCardChange={setFocusedRestaurant}
        />
      )}

      {/* Restaurant Detail Sheet */}
      {selectedRestaurant && showCarousel && (
        <RestaurantDetailSheetV2
          restaurant={selectedRestaurant}
          onClose={() => setSelectedRestaurant(null)}
        />
      )}
    </div>
  );
}

export default Map;
