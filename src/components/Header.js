import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/Header.css';

function Header({ onMenuClick }) {
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);

  const handleMenuClick = () => {
    setMenuOpen(!menuOpen);
    if (onMenuClick) {
      onMenuClick(!menuOpen);
    }
  };

  const handleBack = () => {
    navigate('/');
  };

  return (
    <header className="map-header">
      <div className="header-left">
        <button className="back-btn" onClick={handleBack} title="Back to home">
          ←
        </button>
        <span className="header-title">🍽️ Restaurants</span>
        <span className="location-indicator">📍 New York</span>
      </div>

      <div className="header-right">
        <button
          className={`menu-btn ${menuOpen ? 'active' : ''}`}
          onClick={handleMenuClick}
          title="Menu"
        >
          ☰
        </button>
      </div>
    </header>
  );
}

export default Header;
