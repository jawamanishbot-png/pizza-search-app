import React, { useState } from 'react';
import '../styles/RestaurantDetailSheet.css';

function RestaurantDetailSheet({ restaurant, onClose }) {
  const [currentPhotoIndex, setCurrentPhotoIndex] = useState(0);

  if (!restaurant) return null;

  const handlePrevPhoto = () => {
    setCurrentPhotoIndex((prev) =>
      prev === 0 ? (restaurant.photos?.length || 1) - 1 : prev - 1
    );
  };

  const handleNextPhoto = () => {
    setCurrentPhotoIndex((prev) =>
      prev === (restaurant.photos?.length || 1) - 1 ? 0 : prev + 1
    );
  };

  // Generate mock photo URLs (in real app, use Google Places photo API)
  const photoUrl = restaurant.photos?.[currentPhotoIndex]
    ? `https://maps.googleapis.com/maps/api/place/photo?maxwidth=400&photo_reference=${restaurant.photos[currentPhotoIndex]}&key=${process.env.REACT_APP_GOOGLE_MAPS_API_KEY}`
    : 'https://via.placeholder.com/400x300?text=No+Photo';

  return (
    <div className="restaurant-detail-sheet">
      <div className="sheet-overlay" onClick={onClose} />
      
      <div className="sheet-content">
        {/* Photo carousel */}
        <div className="photo-carousel">
          <img src={photoUrl} alt={restaurant.name} className="restaurant-photo" />
          
          {(restaurant.photos?.length || 0) > 1 && (
            <>
              <button className="photo-nav prev" onClick={handlePrevPhoto}>
                ←
              </button>
              <button className="photo-nav next" onClick={handleNextPhoto}>
                →
              </button>
              <div className="photo-counter">
                {currentPhotoIndex + 1} / {restaurant.photos?.length || 1}
              </div>
            </>
          )}
          
          {(restaurant.types || []).slice(0, 3).map((type, idx) => (
            <span key={idx} className="photo-tag">
              {type.replace(/_/g, ' ')}
            </span>
          ))}
        </div>

        {/* Restaurant details */}
        <div className="sheet-details">
          {/* Name with number and distance */}
          <div className="detail-header">
            <h2 className="restaurant-name">
              {restaurant.number}. {restaurant.name}
            </h2>
            <span className="distance">{(Math.random() * 5).toFixed(1)} mi</span>
          </div>

          {/* Rating */}
          <div className="rating-section">
            <div className="stars">
              {'★'.repeat(Math.round(restaurant.rating || 4))}
              {'☆'.repeat(5 - Math.round(restaurant.rating || 4))}
            </div>
            <span className="rating-value">{restaurant.rating?.toFixed(1) || 'N/A'}</span>
            <span className="reviews">({restaurant.reviews || 0} reviews)</span>
          </div>

          {/* Location and hours */}
          <div className="location-section">
            <div className="location-row">
              <span className="location-icon">📍</span>
              <div className="location-details">
                <span className="address">{restaurant.address}</span>
                <span className="price-range">$$ </span>
                <span className="status">
                  {restaurant.isOpen !== false ? '✓ Open until 9:00 PM' : '✕ Closed'}
                </span>
              </div>
            </div>
          </div>

          {/* Category tags */}
          <div className="tags-section">
            {(restaurant.types || []).slice(0, 2).map((type, idx) => (
              <span key={idx} className="tag">
                {type.replace(/_/g, ' ')}
              </span>
            ))}
          </div>

          {/* Order button */}
          <button className="order-btn" onClick={() => alert('Order feature coming soon!')}>
            Order
          </button>

          {/* Close button */}
          <button className="close-btn" onClick={onClose}>×</button>
        </div>
      </div>
    </div>
  );
}

export default RestaurantDetailSheet;
