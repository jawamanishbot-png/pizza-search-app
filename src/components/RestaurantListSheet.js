import React from 'react';
import '../styles/RestaurantListSheet.css';

function RestaurantListSheet({ restaurants, onCardClick, onClose }) {
  if (!restaurants || restaurants.length === 0) {
    return null;
  }

  return (
    <div className="restaurant-list-sheet">
      <div className="sheet-overlay" onClick={onClose} />
      
      <div className="list-sheet-content">
        {/* Header */}
        <div className="list-sheet-header">
          <h2>All Results</h2>
          <button className="close-btn" onClick={onClose}>×</button>
        </div>

        {/* Scrollable list */}
        <div className="restaurants-list">
          {restaurants.map((restaurant) => (
            <div
              key={restaurant.id}
              className="restaurant-list-card"
              onClick={() => onCardClick(restaurant)}
            >
              {/* Photos carousel */}
              <div className="list-card-photos">
                <img
                  src="https://via.placeholder.com/200x150?text=No+Photo"
                  alt={restaurant.name}
                  onError={(e) => {
                    e.target.src = 'https://via.placeholder.com/200x150?text=No+Photo';
                  }}
                />
              </div>

              {/* Card content */}
              <div className="list-card-content">
                {/* Title with number */}
                <h3 className="list-card-title">
                  {restaurant.number}. {restaurant.name}
                </h3>

                {/* Rating */}
                <div className="list-card-rating">
                  <span className="stars">
                    {'★'.repeat(Math.round(restaurant.rating || 4))}
                    {'☆'.repeat(5 - Math.round(restaurant.rating || 4))}
                  </span>
                  <span className="rating-value">
                    {restaurant.rating?.toFixed(1) || 'N/A'}
                  </span>
                  <span className="reviews">
                    ({restaurant.reviews || 0} reviews)
                  </span>
                </div>

                {/* Location and status */}
                <div className="list-card-info">
                  <span className="location">📍 {restaurant.address}</span>
                  <span className="status">
                    {restaurant.isOpen !== false ? '✓ Open until 9:00 PM' : '✕ Closed'}
                  </span>
                </div>

                {/* Description/snippet */}
                <p className="list-card-description">
                  Popular restaurant with great ratings. Perfect for dining and takeout.
                </p>

                {/* Category tags */}
                <div className="list-card-tags">
                  {(restaurant.types || []).slice(0, 2).map((type, idx) => (
                    <span key={idx} className="tag">
                      {type.replace(/_/g, ' ')}
                    </span>
                  ))}
                </div>

                {/* Call to order button */}
                <button className="call-to-order-btn" onClick={(e) => {
                  e.stopPropagation();
                  alert('Order feature coming soon!');
                }}>
                  Order
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default RestaurantListSheet;
