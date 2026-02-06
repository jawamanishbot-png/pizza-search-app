import React, { useState, useRef, useEffect } from 'react';
import '../styles/RestaurantListSheet.css';

function RestaurantListSheet({ restaurants, filters, onFilterChange, onCardClick, onClose }) {
  const [showSortMenu, setShowSortMenu] = useState(false);
  const [showPriceMenu, setShowPriceMenu] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);
  const [dragStart, setDragStart] = useState(0);
  const sheetRef = useRef(null);
  const contentRef = useRef(null);

  if (!restaurants || restaurants.length === 0) {
    return null;
  }

  const handleSort = (sortBy) => {
    onFilterChange({
      ...filters,
      sortBy: filters.sortBy === sortBy ? null : sortBy,
    });
    setShowSortMenu(false);
  };

  const handlePrice = (priceLevel) => {
    onFilterChange({
      ...filters,
      priceLevel: filters.priceLevel === priceLevel ? null : priceLevel,
    });
    setShowPriceMenu(false);
  };

  const handleToggle = (filterName) => {
    onFilterChange({
      ...filters,
      [filterName]: !filters[filterName],
    });
  };

  const handleDragStart = (e) => {
    setDragStart(e.clientY || (e.touches && e.touches[0].clientY) || 0);
  };

  const handleDragEnd = (e) => {
    const dragEnd = e.clientY || (e.changedTouches && e.changedTouches[0].clientY) || 0;
    const dragDistance = dragStart - dragEnd;

    // Drag up more than 50px = expand
    if (dragDistance > 50) {
      setIsExpanded(true);
    }
    // Drag down more than 50px = collapse
    else if (dragDistance < -50) {
      setIsExpanded(false);
    }
  };

  return (
    <div 
      ref={sheetRef}
      className={`restaurant-list-sheet ${isExpanded ? 'expanded' : 'peek'}`}
      onMouseDown={handleDragStart}
      onMouseUp={handleDragEnd}
      onTouchStart={handleDragStart}
      onTouchEnd={handleDragEnd}
    >
      {isExpanded && <div className="sheet-overlay" onClick={() => setIsExpanded(false)} />}
      
      <div className="list-sheet-content" ref={contentRef}>
        {/* Drag Handle */}
        <div className="drag-handle" />

        {/* Header */}
        <div className="list-sheet-header">
          <h2>All Results</h2>
          {isExpanded && (
            <button className="close-btn" onClick={() => setIsExpanded(false)}>−</button>
          )}
        </div>

        {/* Filter Bar */}
        <div className="list-filter-bar">
          <div className="filter-dropdown">
            <button
              className={`filter-btn ${filters.sortBy ? 'active' : ''}`}
              onClick={() => setShowSortMenu(!showSortMenu)}
              title="Sort options"
            >
              ⭐ Sort {filters.sortBy && `(${filters.sortBy})`}
            </button>
            {showSortMenu && (
              <div className="dropdown-menu">
                <button onClick={() => handleSort('rating')}>By Rating</button>
                <button onClick={() => handleSort('distance')}>By Distance</button>
                <button onClick={() => handleSort(null)}>Clear</button>
              </div>
            )}
          </div>

          <button
            className={`filter-btn ${filters.openNow ? 'active' : ''}`}
            onClick={() => handleToggle('openNow')}
            title="Show only open restaurants"
          >
            🕐 Open Now
          </button>

          <div className="filter-dropdown">
            <button
              className={`filter-btn ${filters.priceLevel ? 'active' : ''}`}
              onClick={() => setShowPriceMenu(!showPriceMenu)}
              title="Filter by price"
            >
              💰 Price {filters.priceLevel && `(${filters.priceLevel})`}
            </button>
            {showPriceMenu && (
              <div className="dropdown-menu">
                <button onClick={() => handlePrice('$')}>$ - Budget</button>
                <button onClick={() => handlePrice('$$')}>$$ - Moderate</button>
                <button onClick={() => handlePrice('$$$')}>$$$ - Upscale</button>
                <button onClick={() => handlePrice('$$$$')}>$$$$ - Fine Dining</button>
                <button onClick={() => handlePrice(null)}>Clear</button>
              </div>
            )}
          </div>

          <button
            className={`filter-btn ${filters.takeout ? 'active' : ''}`}
            onClick={() => handleToggle('takeout')}
            title="Offers takeout"
          >
            📦 Takeout
          </button>
        </div>

        {/* Scrollable list */}
        <div className="restaurants-list">
          {restaurants.map((restaurant) => (
            <div
              key={restaurant.id}
              className="restaurant-list-card"
              onClick={() => onCardClick(restaurant)}
            >
              {/* Photos */}
              <div className="list-card-photos">
                <img
                  src={restaurant.photo ? `/api/photo?reference=${encodeURIComponent(restaurant.photo)}&maxWidth=200` : 'data:image/svg+xml,%3Csvg xmlns=%22http://www.w3.org/2000/svg%22 viewBox=%220 0 200 150%22%3E%3Crect fill=%22%23e8e8e8%22 width=%22200%22 height=%22150%22/%3E%3Ctext x=%2250%25%22 y=%2250%25%22 dominant-baseline=%22middle%22 text-anchor=%22middle%22 font-family=%22Arial%22 font-size=%2216%22 fill=%22%23999%22%3ENo Photo%3C/text%3E%3C/svg%3E'}
                  alt={restaurant.name}
                  onError={(e) => {
                    e.target.src = 'data:image/svg+xml,%3Csvg xmlns=%22http://www.w3.org/2000/svg%22 viewBox=%220 0 200 150%22%3E%3Crect fill=%22%23e8e8e8%22 width=%22200%22 height=%22150%22/%3E%3Ctext x=%2250%25%22 y=%2250%25%22 dominant-baseline=%22middle%22 text-anchor=%22middle%22 font-family=%22Arial%22 font-size=%2216%22 fill=%22%23999%22%3ENo Photo%3C/text%3E%3C/svg%3E';
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
