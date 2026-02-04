import React, { useState, useRef } from 'react';
import '../styles/RestaurantDetailSheet.css';

function RestaurantDetailSheet({ restaurant, onClose }) {
  const [isExpanded, setIsExpanded] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const startYRef = useRef(0);
  const sheetRef = useRef(null);

  if (!restaurant) return null;

  const handleTouchStart = (e) => {
    startYRef.current = e.touches[0].clientY;
    setIsDragging(true);
  };

  const handleTouchMove = (e) => {
    if (!isDragging) return;

    const currentY = e.touches[0].clientY;
    const diff = startYRef.current - currentY;

    // Dragging up - expand
    if (diff > 50) {
      setIsExpanded(true);
      setIsDragging(false);
    }
    // Dragging down - close
    if (diff < -50) {
      setIsExpanded(false);
      setIsDragging(false);
    }
  };

  const handleTouchEnd = () => {
    setIsDragging(false);
  };

  // Generate mock photo URL (in real app, use Google Places photo API)
  const photoUrl = restaurant.photos?.[0]
    ? `https://maps.googleapis.com/maps/api/place/photo?maxwidth=400&photo_reference=${restaurant.photos[0]}&key=${process.env.REACT_APP_GOOGLE_MAPS_API_KEY}`
    : 'https://via.placeholder.com/84x84?text=No+Photo';

  return (
    <div className="restaurant-detail-sheet">
      <div className="sheet-overlay" onClick={onClose} />
      
      <div
        className={`sheet-content ${isExpanded ? 'expanded' : ''}`}
        ref={sheetRef}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
      >
        {/* Close button */}
        <button className="close-btn" onClick={onClose}>×</button>

        {/* Drag handle */}
        <div className="drag-handle" />
        
        {/* Photo carousel - horizontal thumbnails */}
        <div className="photo-carousel">
          {[photoUrl, photoUrl, photoUrl].map((url, idx) => (
            <img
              key={idx}
              src={url}
              alt={`${restaurant.name} ${idx + 1}`}
              className="restaurant-photo"
            />
          ))}
          <div className="see-all">See all</div>
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
        </div>
      </div>
    </div>
  );
}

export default RestaurantDetailSheet;
