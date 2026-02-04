import React, { useRef, useState } from 'react';
import '../styles/RestaurantCardCarousel.css';

function RestaurantCardCarousel({ restaurants, onCardClick, onDismiss }) {
  const scrollContainerRef = useRef(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);

  const checkScroll = () => {
    if (scrollContainerRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = scrollContainerRef.current;
      setCanScrollLeft(scrollLeft > 0);
      setCanScrollRight(scrollLeft < scrollWidth - clientWidth - 10);
    }
  };

  const scroll = (direction) => {
    if (scrollContainerRef.current) {
      const scrollAmount = 320; // Card width + gap
      scrollContainerRef.current.scrollBy({
        left: direction === 'left' ? -scrollAmount : scrollAmount,
        behavior: 'smooth',
      });
      setTimeout(checkScroll, 300);
    }
  };

  React.useEffect(() => {
    checkScroll();
    const container = scrollContainerRef.current;
    if (container) {
      container.addEventListener('scroll', checkScroll);
      return () => container.removeEventListener('scroll', checkScroll);
    }
  }, [restaurants]);

  if (!restaurants || restaurants.length === 0) {
    return null;
  }

  return (
    <>
      {/* Overlay to dismiss carousel when clicking outside */}
      <div className="carousel-overlay" onClick={onDismiss} />
      
      <div className="restaurant-carousel-container">
      {canScrollLeft && (
        <button className="scroll-btn left" onClick={() => scroll('left')}>
          ◀
        </button>
      )}

      <div className="restaurant-carousel" ref={scrollContainerRef}>
        {restaurants.map((restaurant) => (
          <div
            key={restaurant.id}
            className="restaurant-card"
            onClick={() => onCardClick(restaurant)}
          >
            {/* Card image */}
            <div className="card-image">
              <img
                src={restaurant.photo ? `/api/photo?reference=${encodeURIComponent(restaurant.photo)}&maxWidth=400` : 'data:image/svg+xml,%3Csvg xmlns=%22http://www.w3.org/2000/svg%22 viewBox=%220 0 300 200%22%3E%3Crect fill=%22%23e8e8e8%22 width=%22300%22 height=%22200%22/%3E%3Ctext x=%2250%25%22 y=%2250%25%22 dominant-baseline=%22middle%22 text-anchor=%22middle%22 font-family=%22Arial%22 font-size=%2220%22 fill=%22%23999%22%3ENo Photo%3C/text%3E%3C/svg%3E'}
                alt={restaurant.name}
                onError={(e) => {
                  e.target.src = 'data:image/svg+xml,%3Csvg xmlns=%22http://www.w3.org/2000/svg%22 viewBox=%220 0 300 200%22%3E%3Crect fill=%22%23e8e8e8%22 width=%22300%22 height=%22200%22/%3E%3Ctext x=%2250%25%22 y=%2250%25%22 dominant-baseline=%22middle%22 text-anchor=%22middle%22 font-family=%22Arial%22 font-size=%2220%22 fill=%22%23999%22%3ENo Photo%3C/text%3E%3C/svg%3E';
                }}
              />
              <div className="card-number">{restaurant.number}</div>
            </div>

            {/* Card content */}
            <div className="card-content">
              <h3 className="card-title">{restaurant.name}</h3>

              {/* Rating */}
              <div className="card-rating">
                <span className="stars">
                  {'★'.repeat(Math.round(restaurant.rating || 4))}
                  {'☆'.repeat(5 - Math.round(restaurant.rating || 4))}
                </span>
                <span className="rating-text">
                  {restaurant.rating?.toFixed(1) || 'N/A'}
                </span>
              </div>

              {/* Location */}
              <p className="card-location">📍 {restaurant.address}</p>

              {/* Status */}
              <p className="card-status">
                {restaurant.isOpen !== false ? '✓ Open' : '✕ Closed'}
              </p>
            </div>
          </div>
        ))}
      </div>

      {canScrollRight && (
        <button className="scroll-btn right" onClick={() => scroll('right')}>
          ▶
        </button>
      )}
      </div>
    </>
  );
}

export default RestaurantCardCarousel;
