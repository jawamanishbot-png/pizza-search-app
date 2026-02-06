import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/Home.css';

function Home() {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');

  const handleSearch = () => {
    navigate('/map', { state: { searchQuery: searchQuery || 'restaurants' } });
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  };

  return (
    <div className="home">
      <div className="home-content">
        <h1>🍽️ Restaurant Search</h1>
        <p>Find any restaurant near you</p>
        
        <div className="search-container">
          <input
            type="text"
            placeholder="Search by cuisine or restaurant name..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            onKeyPress={handleKeyPress}
            className="search-input"
          />
          <button 
            onClick={handleSearch} 
            className="btn-primary"
          >
            Search
          </button>
        </div>

        <p className="hint">Examples: Italian, Thai, Domino's, Sushi, Mexican...</p>
      </div>
    </div>
  );
}

export default Home;
