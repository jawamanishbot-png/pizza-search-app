import React, { useState } from 'react';
import '../styles/FilterBar.css';

function FilterBar({ filters, onFilterChange }) {
  const [showSortMenu, setShowSortMenu] = useState(false);
  const [showPriceMenu, setShowPriceMenu] = useState(false);

  const handleToggle = (filterName) => {
    onFilterChange({
      ...filters,
      [filterName]: !filters[filterName],
    });
  };

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

  return (
    <div className="filter-bar-container">
      <div className="filter-bar">
        {/* Sort Dropdown */}
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

        {/* Open Now Toggle */}
        <button
          className={`filter-btn ${filters.openNow ? 'active' : ''}`}
          onClick={() => handleToggle('openNow')}
          title="Show only open restaurants"
        >
          🕐 Open Now
        </button>

        {/* Price Dropdown */}
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

        {/* Takeout Toggle */}
        <button
          className={`filter-btn ${filters.takeout ? 'active' : ''}`}
          onClick={() => handleToggle('takeout')}
          title="Offers takeout"
        >
          📦 Takeout
        </button>
      </div>
    </div>
  );
}

export default FilterBar;
