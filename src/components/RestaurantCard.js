import React, { useState, useEffect } from 'react';
import {
  calculateDistance,
  formatPriceLevel,
  getTodayHours,
  getRestaurantType,
  getPlaceDetails,
} from '../utils/placesService';
import '../styles/RestaurantCard.css';

function RestaurantCard({ restaurant, markerNumber, center, onClose }) {
  const [details, setDetails] = useState(null);
  const [loading, setLoading] = useState(true);
  const [currentPhotoIndex, setCurrentPhotoIndex] = useState(0);

  useEffect(() => {
    const fetchDetails = async () => {
      try {
        const placeDetails = await getPlaceDetails(restaurant.place_id);
        setDetails(placeDetails);
      } catch (err) {
        console.error('Error fetching place details:', err);
        // Use basic restaurant data if details fail
        setDetails({
          name: restaurant.name,
          photos: restaurant.photos,
          rating: restaurant.rating,
          review_count: restaurant.user_ratings_total,
          geometry: restaurant.geometry,
        });
      } finally {
        setLoading(false);
      }
    };

    if (restaurant.place_id) {
      fetchDetails();
    }
  }, [restaurant]);

  if (loading) {
    return (
      <div className="restaurant-card">
        <div className="loading">Loading restaurant details...</div>
      </div>
    );
  }

  if (!details) {
    return (
      <div className="restaurant-card">
        <div className="error-state">Could not load restaurant</div>
      </div>
    );
  }

  const distance = center ? calculateDistance(center, {
    lat: details.geometry.location.lat(),
    lng: details.geometry.location.lng(),
  }) : null;

  const photos = details.photos || [];
  const currentPhoto = photos[currentPhotoIndex];
  const photoUrl = currentPhoto
    ? currentPhoto.getUrl({ maxWidth: 400, maxHeight: 300 })
    : null;

  const priceLevel = details.price_level
    ? formatPriceLevel(details.price_level)
    : 'N/A';

  const categories = getRestaurantType(details.types);
  const hoursText = getTodayHours(details.opening_hours);

  const handleNextPhoto = () => {
    setCurrentPhotoIndex((prev) => (prev + 1) % photos.length);
  };

  const handlePrevPhoto = () => {
    setCurrentPhotoIndex((prev) => (prev - 1 + photos.length) % photos.length);
  };

  const handleOrderClick = () => {
    if (details.website) {
      window.open(details.website, '_blank');
    } else if (details.url) {
      window.open(details.url, '_blank');
    }
  };

  const renderStars = (rating) => {
    if (!rating) return null;
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 !== 0;
    const emptyStars = 5 - fullStars - (hasHalfStar ? 1 : 0);

    return (
      <div className="stars">
        {'⭐'.repeat(fullStars)}
        {hasHalfStar && <span className="half-star">⭐</span>}
        {'☆'.repeat(emptyStars)}
      </div>
    );
  };

  return (
    <div className="restaurant-card">
      <div className="card-header">
        <button className="close-btn" onClick={onClose}>
          ✕
        </button>
      </div>

      {/* Photo Carousel */}
      {photos.length > 0 && (
        <div className="photo-carousel">
          <div className="photo-container">
            {photoUrl && <img src={photoUrl} alt={details.name} />}
          </div>

          {photos.length > 1 && (
            <div className="carousel-controls">
              <button className="carousel-btn prev" onClick={handlePrevPhoto}>
                ‹
              </button>
              <div className="photo-counter">
                {currentPhotoIndex + 1} / {photos.length}
              </div>
              <button className="carousel-btn next" onClick={handleNextPhoto}>
                ›
              </button>
            </div>
          )}
        </div>
      )}

      {/* Restaurant Info */}
      <div className="card-content">
        <div className="header-section">
          <div className="name-and-marker">
            <h2>{details.name}</h2>
            <span className="marker-badge">#{markerNumber}</span>
          </div>

          {distance && (
            <div className="distance">{distance} mi away</div>
          )}
        </div>

        {/* Rating Section */}
        {details.rating && (
          <div className="rating-section">
            <div className="rating-display">
              <span className="rating-number">{details.rating}</span>
              {renderStars(details.rating)}
            </div>
            {details.review_count && (
              <span className="review-count">
                {details.review_count.toLocaleString()} reviews
              </span>
            )}
          </div>
        )}

        {/* Location & Details */}
        {details.formatted_address && (
          <div className="location-details">
            <div className="location-row">
              <span className="label">📍 Address:</span>
              <span className="value">{details.formatted_address}</span>
            </div>

            <div className="location-inline">
              {priceLevel !== 'N/A' && (
                <span className="price-level">{priceLevel}</span>
              )}
              {hoursText && <span className="hours">{hoursText}</span>}
            </div>
          </div>
        )}

        {/* Categories */}
        {categories.length > 0 && (
          <div className="categories">
            {categories.map((category, idx) => (
              <span key={idx} className="category-tag">
                {category}
              </span>
            ))}
          </div>
        )}

        {/* Phone */}
        {details.formatted_phone_number && (
          <div className="phone">
            <span className="label">📞</span>
            <a href={`tel:${details.formatted_phone_number}`}>
              {details.formatted_phone_number}
            </a>
          </div>
        )}

        {/* Order Button */}
        <button
          className="order-button"
          onClick={handleOrderClick}
          disabled={!details.website && !details.url}
        >
          Order Now 🍕
        </button>
      </div>
    </div>
  );
}

export default RestaurantCard;
