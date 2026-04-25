import React, { useState, useEffect } from 'react';
import './LocationTracking.css'; // Add CSS for styling
import { updateLocation } from '../api/userApi'; // Assuming this function exists in your API handler

const LocationTracking = () => {
  const [location, setLocation] = useState(null);
  const [error, setError] = useState(null);
  const [isTracking, setIsTracking] = useState(false);
  const [authError, setAuthError] = useState(null); // For auth error handling
  const token = localStorage.getItem('token'); // Use token from localStorage

  useEffect(() => {
    if (!token) {
      setAuthError('User not authenticated');
    }
  }, [token]);

  useEffect(() => {
    if (isTracking && token) {
      getLocation();
    }
  }, [isTracking, token]);

  const getLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        async (position) => {
          const { latitude, longitude } = position.coords;
          setLocation({ latitude, longitude });
          setError(null);

          // Update location in the backend
          try {
            await updateLocation({ latitude, longitude }, token); // Send token to backend
          } catch (error) {
            setError('Unable to update location.');
          }
        },
        (err) => {
          setError('Unable to retrieve your location.');
        }
      );
    } else {
      setError('Geolocation is not supported by this browser.');
    }
  };

  const startTracking = () => {
    setIsTracking(true);
  };

  const stopTracking = () => {
    setIsTracking(false);
    setLocation(null); // Clear location when tracking stops
  };

  return (
    <div className="location-tracking page">
      <h2>Location Tracking</h2>
      <p>Track your location in real time for enhanced safety.</p>

      {/* Authentication Error */}
      {authError && <p className="error">{authError}</p>}

      {/* Start and Stop Tracking Buttons */}
      <div className="tracking-buttons">
        {!isTracking ? (
          <button onClick={startTracking} className="start-button">
            Start Tracking
          </button>
        ) : (
          <button onClick={stopTracking} className="stop-button">
            Stop Tracking
          </button>
        )}
      </div>

      {/* Location Information */}
      {location && !error && (
        <div className="location-info">
          <p><strong>Latitude:</strong> {location.latitude}</p>
          <p><strong>Longitude:</strong> {location.longitude}</p>
        </div>
      )}

      {/* Error Handling */}
      {error && <p className="error">{error}</p>}

      {/* How It Works Section */}
      <section className="how-it-works">
        <div className="how-it-box">
          <h3>Real-Time Tracking</h3>
          <p>Activate location tracking to view your real-time location on the map.</p>
        </div>
        <div className="how-it-box">
          <h3>Enhanced Safety</h3>
          <p>Keep your loved ones updated with your whereabouts in case of emergencies.</p>
        </div>
        <div className="how-it-box">
          <h3>Track Anywhere</h3>
          <p>Whether you're at home, work, or traveling, track your location effortlessly.</p>
        </div>
      </section>

      {/* Optional: Add Map */}
      {location && !error && (
        <div className="map-container">
          <iframe
            title="Location Map"
            width="100%"
            height="400"
            src={`https://www.google.com/maps?q=${location.latitude},${location.longitude}&z=15&output=embed`}
            frameBorder="0"
            allowFullScreen
          ></iframe>
        </div>
      )}

      {/* Coming Soon Banner */}
      <div className="coming-soon-banner">
        <p>🚧 Feature coming soon with advanced real-time tracking! 🚀</p>
      </div>
    </div>
  );
};

export default LocationTracking;
