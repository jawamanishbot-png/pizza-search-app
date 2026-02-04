import React from 'react';
import '../styles/FilterBar.css';

function FilterBar({ filters, onFilterChange }) {
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
  };

  return (
    <div className="filter-bar">
      <button
        className={`filter-btn ${filters.sortBy === 'rating' ? 'active' : ''}`}
        onClick={() => handleSort('rating')}
        title="Sort by rating"
      >
        ⭐ Sort
      </button>

      <button
        className={`filter-btn ${filters.openNow ? 'active' : ''}`}
        onClick={() => handleToggle('openNow')}
        title="Show only open restaurants"
      >
        🕐 Open Now
      </button>

      <button
        className={`filter-btn ${filters.priceLevel ? 'active' : ''}`}
        onClick={() => handleToggle('priceLevel')}
        title="Filter by price"
      >
        💰 Price
      </button>

      <button
        className={`filter-btn ${filters.takeout ? 'active' : ''}`}
        onClick={() => handleToggle('takeout')}
        title="Offers takeout"
      >
        📦 Takeout
      </button>
    </div>
  );
}

export default FilterBar;
