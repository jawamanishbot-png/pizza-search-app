import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/Home.css';

function Home() {
  const navigate = useNavigate();
  const [locationRequested, setLocationRequested] = useState(false);
  const [locationStatus, setLocationStatus] = useState('');

  useEffect(() => {
    requestLocation();
  }, []);

  const requestLocation = () => {
    if (!navigator.geolocation) {
      setLocationStatus('Geolocation not supported');
      setLocationRequested(true);
      return;
    }

    setLocationStatus('Requesting location...');
    
    navigator.geolocation.getCurrentPosition(
      (position) => {
        setLocationStatus('✓ Location granted');
        setLocationRequested(true);
      },
      (error) => {
        console.warn('Location request error:', error);
        setLocationStatus('⚠️ Location permission denied (will use default)');
        setLocationRequested(true);
      }
    );
  };

  return (
    <div className="home">
      <div className="home-content">
        <h1>🍕 Pizza Search</h1>
        <p>Find pizza restaurants near you</p>
        
        {/* Location Status */}
        <div className="location-status">
          {locationRequested ? (
            <p className="status-message">{locationStatus}</p>
          ) : (
            <p className="status-message">Getting your location...</p>
          )}
        </div>

        {/* Start Button */}
        <button 
          onClick={() => navigate('/map')} 
          className="btn-primary"
          disabled={!locationRequested}
        >
          {locationRequested ? 'Start Search' : 'Getting Location...'}
        </button>
      </div>
    </div>
  );
}

export default Home;
