// frontend/src/pages/Profile.js
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './Profile.css';

function Profile() {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);

  // Fetch user data from localStorage
  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem('user'));
    if (storedUser) {
      setUser(storedUser);
    } else {
      navigate('/login'); // If no user is logged in, redirect to login page
    }
  }, [navigate]);

  // Handle logout
  const handleLogout = () => {
    localStorage.removeItem('user');  // Clear user data from localStorage
    navigate('/login');  // Redirect to login page
  };

  return (
    <div className="profile-container">
      {user ? (
        <div className="profile-content">
          <h2>User Profile</h2>
          <div className="profile-details">
            <p><strong>Name:</strong> {user.name}</p>
            <p><strong>Email:</strong> {user.email}</p>
            <h3>Alert History:</h3>
            <ul>
              {user.alerts && user.alerts.length > 0 ? (
                user.alerts.map((alert, index) => (
                  <li key={index}>
                    <strong>{alert.timestamp ? new Date(alert.timestamp).toLocaleString() : 'Unknown time'}:</strong> {alert.message}
                  </li>
                ))
              ) : (
                <p>No alerts recorded</p>
              )}
            </ul>
          </div>

          <div className="logout-container">
            <button onClick={handleLogout} className="logout-button">
              Logout
            </button>
          </div>
        </div>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
}

export default Profile;
