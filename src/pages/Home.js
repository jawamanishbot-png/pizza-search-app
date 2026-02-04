import React from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/Home.css';

function Home() {
  const navigate = useNavigate();

  return (
    <div className="home">
      <div className="home-content">
        <h1>🍕 Pizza Search</h1>
        <p>Find pizza restaurants near you</p>
        
        <button 
          onClick={() => navigate('/map')} 
          className="btn-primary"
        >
          Start Search
        </button>
      </div>
    </div>
  );
}

export default Home;
