import React, { useState } from 'react';
import '../styles/RestaurantDetailSheetV2.css';

function RestaurantDetailSheetV2({ restaurant, onClose }) {
  const [activeTab, setActiveTab] = useState('menu');
  const [userRating, setUserRating] = useState(0);
  const [reviewText, setReviewText] = useState('');
  const [showAllInsights, setShowAllInsights] = useState(false);

  if (!restaurant) return null;

  return (
    <div className="restaurant-detail-sheet-v2">
      <div className="sheet-overlay" onClick={onClose} />

      <div className="detail-sheet-content">
        {/* Hero Image Section */}
        <div className="detail-hero">
          <img
            src={restaurant.photo ? `/api/photo?reference=${encodeURIComponent(restaurant.photo)}&maxWidth=600` : 'https://via.placeholder.com/600x400?text=No+Photo'}
            alt={restaurant.name}
            onError={(e) => {
              e.target.src = 'https://via.placeholder.com/600x400?text=No+Photo';
            }}
          />
          <div className="hero-overlay">
            <button className="hero-back" onClick={onClose}>← Search</button>
            <div className="hero-actions">
              <button className="hero-action">🔖</button>
              <button className="hero-action">↗️</button>
              <button className="hero-action">⋯</button>
            </div>
          </div>
          <div className="hero-photos-link">See all photos</div>
        </div>

        {/* Header Section */}
        <div className="detail-header">
          <h1 className="detail-title">{restaurant.name}</h1>

          {/* Rating */}
          <div className="detail-rating">
            <div className="stars">
              {'★'.repeat(Math.round(restaurant.rating || 4))}
              {'☆'.repeat(5 - Math.round(restaurant.rating || 4))}
            </div>
            <span className="rating-value">{restaurant.rating?.toFixed(1) || 'N/A'}</span>
            <span className="review-count">({restaurant.reviews || 0} reviews)</span>
          </div>

          {/* Info Row */}
          <div className="detail-info-row">
            <span className="price-range">$$ •</span>
            <span className="cuisine">Restaurant</span>
            <span className="status" style={{color: restaurant.isOpen !== false ? '#27ae60' : '#e74c3c'}}>
              {restaurant.isOpen !== false ? '✓ Open' : '✕ Closed'}
            </span>
            {restaurant.isOpen !== false && <span className="hours"> until 9:00 PM</span>}
          </div>

          <div className="updated-text">Updated over 3 months ago</div>
        </div>

        {/* Vibe/Description Section */}
        <div className="detail-vibe">
          <div className="vibe-header">
            🎨 See the Vibe <span className="badge">New</span>
          </div>
          <p className="vibe-text">
            Discover amazing dining experience with great service and authentic cuisine. Popular destination for locals and tourists alike.
          </p>
        </div>

        {/* Action Buttons */}
        <div className="detail-actions">
          <button className="action-btn btn-review">★ Add review</button>
          <button className="action-btn btn-secondary">🌐 Website</button>
          <button className="action-btn btn-secondary">☎️ Call</button>
          <button className="action-btn btn-secondary">👤</button>
        </div>

        {/* Recommendation Section */}
        <div className="detail-recommend">
          <h3>Recommend this place?</h3>
          <div className="recommend-buttons">
            <button className="recommend-btn">Yes</button>
            <button className="recommend-btn">No</button>
            <button className="recommend-btn">Maybe</button>
          </div>
        </div>

        {/* Tabs */}
        <div className="detail-tabs">
          <button
            className={`tab ${activeTab === 'menu' ? 'active' : ''}`}
            onClick={() => setActiveTab('menu')}
          >
            Menu
          </button>
          <button
            className={`tab ${activeTab === 'info' ? 'active' : ''}`}
            onClick={() => setActiveTab('info')}
          >
            Info
          </button>
          <button
            className={`tab ${activeTab === 'reviews' ? 'active' : ''}`}
            onClick={() => setActiveTab('reviews')}
          >
            Reviews
          </button>
          <button
            className={`tab ${activeTab === 'more' ? 'active' : ''}`}
            onClick={() => setActiveTab('more')}
          >
            More like this
          </button>
        </div>

        {/* Tab Content */}
        <div className="detail-tab-content">
          {activeTab === 'menu' && (
            <div className="tab-menu">
              <div className="menu-section">
                <h3>Popular Dishes</h3>
                <div className="menu-grid">
                  <div className="menu-item">
                    <img src="https://via.placeholder.com/150x150?text=Dish+1" alt="Dish" />
                  </div>
                  <div className="menu-item">
                    <img src="https://via.placeholder.com/150x150?text=Dish+2" alt="Dish" />
                  </div>
                  <div className="menu-item">
                    <img src="https://via.placeholder.com/150x150?text=Dish+3" alt="Dish" />
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'info' && (
            <div className="tab-info">
              {/* Hours Section */}
              <div className="info-section">
                <h4 className="section-title">Hours</h4>
                <div className="section-content">
                  <span className="updated-ago">Updated over 3 months ago</span>
                  <span className="status-open" style={{color: restaurant.isOpen !== false ? '#27ae60' : '#e74c3c'}}>
                    {restaurant.isOpen !== false ? '✓ Open until 9:00 PM' : '✕ Closed now'} • 5:00 PM - 10:00 PM
                  </span>
                </div>
                <button className="expand-btn">→</button>
              </div>

              {/* Website Section */}
              <div className="info-section">
                <h4 className="section-title">Website</h4>
                <div className="section-content">
                  <a href="https://pizzarestaurant.com" target="_blank" rel="noopener noreferrer" className="info-link">pizzarestaurant.com</a>
                </div>
                <button className="expand-btn">↗️</button>
              </div>

              {/* Call Section */}
              <div className="info-section">
                <h4 className="section-title">Call</h4>
                <div className="section-content">
                  <a href="tel:+12061234567" className="info-link">(206) 123-4567</a>
                </div>
                <button className="expand-btn">☎️</button>
              </div>

              {/* Message Section */}
              <div className="info-section">
                <h4 className="section-title">Message</h4>
                <button className="message-btn">💬</button>
              </div>

              {/* Map Section */}
              <div className="info-map">
                <div className="map-placeholder">
                  <img src="https://via.placeholder.com/500x300?text=Google+Map" alt="Location Map" />
                </div>
              </div>

              {/* Directions Info */}
              <div className="directions-info">
                <div className="drive-time">
                  <span className="icon">🚗</span>
                  <div className="drive-details">
                    <div className="time-distance">20 min drive <span className="distance">12 mi</span></div>
                    <div className="address">{restaurant.address}</div>
                  </div>
                </div>
                <div className="parking-info">
                  <span className="icon">🅿️</span>
                  <span>Street Parking</span>
                </div>
              </div>

              {/* Bottom Action Buttons */}
              <div className="info-actions">
                <button className="info-action-btn btn-website">✏️ Website</button>
                <button className="info-action-btn">☎️ Call</button>
                <button className="info-action-btn">📍 Map</button>
                <button className="info-action-btn">🔖 Save</button>
              </div>
            </div>
          )}

          {activeTab === 'reviews' && (
            <div className="tab-reviews">
              {/* Leave a Review Section */}
              <div className="review-section">
                <h3>Leave a review</h3>
                
                {/* Star Rating */}
                <div className="star-rating">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <span
                      key={star}
                      className={`star ${userRating >= star ? 'active' : ''}`}
                      onClick={() => setUserRating(star)}
                    >
                      ★
                    </span>
                  ))}
                </div>

                {/* Review Text Area */}
                <textarea
                  className="review-textarea"
                  placeholder="Tap to review..."
                  value={reviewText}
                  onChange={(e) => setReviewText(e.target.value)}
                />

                {/* Review Actions */}
                <div className="review-actions">
                  <button className="review-btn">📷 Add photo</button>
                  <button className="review-btn">⚙️ Check In</button>
                </div>
              </div>

              {/* Recommended Reviews Section */}
              <div className="reviews-list-section">
                <h3>Recommended reviews</h3>

                {/* Overall Rating */}
                <div className="overall-rating">
                  <div className="rating-left">
                    <div className="big-stars">
                      {'★'.repeat(4)}
                      {'☆'.repeat(1)}
                    </div>
                    <div className="rating-number">4.5</div>
                    <div className="review-count">1,543 reviews</div>
                  </div>

                  {/* Rating Distribution */}
                  <div className="rating-distribution">
                    {[5, 4, 3, 2, 1].map((rating) => (
                      <div key={rating} className="rating-row">
                        <span className="rating-label">{rating}</span>
                        <div className="rating-bar">
                          <div 
                            className="rating-fill" 
                            style={{
                              width: rating === 5 ? '95%' : rating === 4 ? '40%' : rating === 3 ? '20%' : rating === 2 ? '10%' : '8%'
                            }}
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Filter/Search Controls */}
                <div className="review-controls">
                  <button className="control-btn">🔍 Search</button>
                  <button className="control-btn">▼ Yelp sort</button>
                  <button className="control-btn">▼ Filter by rating</button>
                </div>

                {/* Insights Section */}
                <div className="insights-section">
                  <h4>Insights</h4>
                  <div className={`insights-grid ${showAllInsights ? 'expanded' : ''}`}>
                    <div className="insight-tag">✓ Ambience (641)</div>
                    <div className="insight-tag">✓ Drinks (116)</div>
                    <div className="insight-tag">✓ Food (1452)</div>
                    {showAllInsights && (
                      <>
                        <div className="insight-tag">✓ Service (1073)</div>
                        <div className="insight-tag">◯ Wait time (780)</div>
                      </>
                    )}
                  </div>
                  <button 
                    className="hide-insights-btn"
                    onClick={() => setShowAllInsights(!showAllInsights)}
                  >
                    {showAllInsights ? 'Hide insights ▲' : 'Show more insights ▼'}
                  </button>
                </div>

                {/* Action Buttons */}
                <div className="info-actions">
                  <button className="info-action-btn btn-website">✏️ Website</button>
                  <button className="info-action-btn">☎️ Call</button>
                  <button className="info-action-btn">📍 Map</button>
                  <button className="info-action-btn">🔖 Save</button>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'more' && (
            <div className="tab-more">
              <p style={{padding: '16px', color: '#999'}}>
                Similar restaurants loading...
              </p>
            </div>
          )}
        </div>

        {/* Bottom spacing */}
        <div style={{height: '20px'}} />
      </div>
    </div>
  );
}

export default RestaurantDetailSheetV2;
