import React, { useState, useEffect, useRef } from 'react';
import { GoogleMap, LoadScript, MarkerF } from '@react-google-maps/api';
import Header from '../components/Header';
import RestaurantCard from '../components/RestaurantCard';
import FilterBar from '../components/FilterBar';
import { createNumberedMarkerIcon, createHighlightedMarkerIcon } from '../components/NumberedMarker';
import { searchRestaurants } from '../utils/placesService';
import '../styles/Map.css';

const API_KEY = process.env.REACT_APP_GOOGLE_MAPS_API_KEY;
const DEFAULT_CENTER = { lat: 40.7128, lng: -74.0060 }; // New York

const mapContainerStyle = {
  width: '100%',
  height: '100%',
};

function Map() {
  // State management
  const [center, setCenter] = useState(DEFAULT_CENTER);
  const [restaurants, setRestaurants] = useState([]);
  const [selectedRestaurant, setSelectedRestaurant] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [hasMapMoved, setHasMapMoved] = useState(false);
  const mapRef = useRef(null);

  // Filter state
  const [filters, setFilters] = useState({
    openNow: false,
    priceLevel: false,
    takeout: false,
    sortBy: null,
  });

  // Initial load - fetch restaurants for default location
  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(() => {
    const fetchInitialRestaurants = async () => {
      setLoading(true);
      setError(null);
      try {
        const results = await searchRestaurants(DEFAULT_CENTER, 5000, {});
        setRestaurants(results);
        setSelectedRestaurant(null);
      } catch (err) {
        console.error('Error fetching restaurants:', err);
        setError('Failed to load restaurants. Please try again.');
      } finally {
        setLoading(false);
      }
    };

    if (API_KEY) {
      fetchInitialRestaurants();
    }
  }, []);

  // Apply filters and sorting
  const getFilteredRestaurants = () => {
    let filtered = [...restaurants];

    if (filters.priceLevel) {
      filtered = filtered.filter((r) => r.price_level && r.price_level <= 2);
    }

    if (filters.sortBy === 'rating') {
      filtered.sort((a, b) => (b.rating || 0) - (a.rating || 0));
    }

    return filtered;
  };

  const filteredRestaurants = getFilteredRestaurants();

  const handleMapDrag = () => {
    setHasMapMoved(true);
  };

  const handleRedoSearch = async () => {
    setLoading(true);
    setError(null);
    setHasMapMoved(false);

    try {
      const currentCenter = mapRef.current?.getCenter();
      if (currentCenter) {
        const newCenter = {
          lat: currentCenter.lat(),
          lng: currentCenter.lng(),
        };
        const results = await searchRestaurants(newCenter, 5000, filters);
        setRestaurants(results);
        setSelectedRestaurant(null);
        setCenter(newCenter);
      }
    } catch (err) {
      console.error('Error redoing search:', err);
      setError('Failed to search in this area.');
    } finally {
      setLoading(false);
    }
  };

  const handleMarkerClick = (restaurant) => {
    setSelectedRestaurant(restaurant);
  };

  const handleFilterChange = (newFilters) => {
    setFilters(newFilters);
  };

  const handleMenuClick = () => {
    console.log('Menu clicked');
  };

  if (!API_KEY) {
    return (
      <div className="error-state">
        <h2>❌ Configuration Error</h2>
        <p>Google Maps API key not configured.</p>
        <p>Please set REACT_APP_GOOGLE_MAPS_API_KEY in your .env file.</p>
      </div>
    );
  }

  return (
    <LoadScript
      googleMapsApiKey={API_KEY}
      libraries={['places', 'maps']}
      onLoad={() => console.log('Google Maps loaded')}
    >
      <div className="map-page-container">
        <Header onMenuClick={handleMenuClick} />

        <div className="map-wrapper">
          <GoogleMap
            mapContainerStyle={mapContainerStyle}
            center={center}
            zoom={13}
            onLoad={(map) => {
              mapRef.current = map;
            }}
            onDragEnd={handleMapDrag}
            options={{
              gestureHandling: 'greedy',
              controlSize: 32,
            }}
          >
            {filteredRestaurants.map((restaurant, index) => {
              const isSelected = selectedRestaurant?.place_id === restaurant.place_id;
              const icon = isSelected
                ? createHighlightedMarkerIcon(index + 1)
                : createNumberedMarkerIcon(index + 1);

              return (
                <MarkerF
                  key={restaurant.place_id}
                  position={{
                    lat: restaurant.geometry.location.lat(),
                    lng: restaurant.geometry.location.lng(),
                  }}
                  icon={icon}
                  onClick={() => handleMarkerClick(restaurant)}
                  title={restaurant.name}
                  animation={isSelected ? window.google.maps.Animation.BOUNCE : undefined}
                />
              );
            })}
          </GoogleMap>

          {hasMapMoved && (
            <button className="redo-search-btn" onClick={handleRedoSearch}>
              🔄 Redo Search in This Area
            </button>
          )}

          {loading && (
            <div className="loading-overlay">
              <div className="spinner"></div>
              <p>Searching for restaurants...</p>
            </div>
          )}

          {error && (
            <div className="error-banner">
              <span>⚠️ {error}</span>
              <button onClick={() => setError(null)}>✕</button>
            </div>
          )}
        </div>

        {!loading && filteredRestaurants.length > 0 && (
          <div className="restaurant-info">
            Found {filteredRestaurants.length} restaurant{filteredRestaurants.length !== 1 ? 's' : ''}
          </div>
        )}

        <FilterBar filters={filters} onFilterChange={handleFilterChange} />

        {selectedRestaurant && (
          <RestaurantCard
            restaurant={selectedRestaurant}
            markerNumber={
              filteredRestaurants.findIndex((r) => r.place_id === selectedRestaurant.place_id) + 1
            }
            center={center}
            onClose={() => setSelectedRestaurant(null)}
          />
        )}

        {!loading && filteredRestaurants.length === 0 && (
          <div className="empty-state">
            <h3>🔍 No restaurants found</h3>
            <p>Try adjusting filters or searching in a different area</p>
          </div>
        )}
      </div>
    </LoadScript>
  );
}

export default Map;
