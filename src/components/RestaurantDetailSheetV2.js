import React, { useState } from 'react';
import '../styles/RestaurantDetailSheetV2.css';

function RestaurantDetailSheetV2({ restaurant, onClose }) {
  const [activeTab, setActiveTab] = useState('menu');

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
              <div className="info-item">
                <span className="info-label">📍 Address</span>
                <span className="info-value">{restaurant.address}</span>
              </div>
              <div className="info-item">
                <span className="info-label">🕐 Hours</span>
                <span className="info-value">Open until 9:00 PM</span>
              </div>
              <div className="info-item">
                <span className="info-label">💰 Price Range</span>
                <span className="info-value">$$</span>
              </div>
              <div className="info-item">
                <span className="info-label">🏷️ Categories</span>
                <span className="info-value">
                  {(restaurant.types || []).slice(0, 3).join(', ')}
                </span>
              </div>
            </div>
          )}

          {activeTab === 'reviews' && (
            <div className="tab-reviews">
              <p style={{padding: '16px', color: '#999'}}>
                Reviews coming soon
              </p>
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
