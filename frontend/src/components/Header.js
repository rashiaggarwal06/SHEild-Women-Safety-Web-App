import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import logo from '../assets/logo.png';

function Header() {
  const [user, setUser] = useState(null);

  // Check if user is logged in (retrieve from localStorage)
  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem('user')); // Get user from localStorage or context
    if (storedUser) {
      setUser(storedUser); // Set user if available
    }
  }, []);

  // Handle logout
  const handleLogout = () => {
    localStorage.removeItem('user'); // Remove user from localStorage
    setUser(null); // Update state to logged out
    window.location.href = '/'; // Redirect to home page after logout
  };

  return (
    <header style={{
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      padding: '10px 20px',
      backgroundColor: '#333',
      color: 'white',
    }}>
      <div style={{ display: 'flex', alignItems: 'center' }}>
        <img src={logo} alt="logo" style={{ width: '50px', height: '50px', marginRight: '10px' }} />
        <h1 style={{ margin: 0 }}>Women's Safety App</h1>
      </div>
      <nav style={{ display: 'flex', gap: '15px' }}>
        <Link to="/" style={{ color: 'white', textDecoration: 'none' }}>Home</Link>
        <Link to="/face-recognition" style={{ color: 'white', textDecoration: 'none' }}>Face Recognition</Link>
        <Link to="/voice-detection" style={{ color: 'white', textDecoration: 'none' }}>Voice Detection</Link>
        <Link to="/location-tracking" style={{ color: 'white', textDecoration: 'none' }}>Location Tracking</Link>
        
        {/* Conditionally render profile and logout based on user authentication */}
        {user ? (
          <>
            <Link to="/profile" style={{ color: 'white', textDecoration: 'none' }}>Profile</Link>
            <button onClick={handleLogout} style={{
              color: 'white',
              backgroundColor: 'transparent',
              border: 'none',
              cursor: 'pointer'
            }}>Logout</button>
          </>
        ) : (
          <>
            <Link to="/login" style={{ color: 'white', textDecoration: 'none' }}>Login</Link>
            <Link to="/signup" style={{ color: 'white', textDecoration: 'none' }}>Signup</Link>
          </>
        )}
      </nav>
    </header>
  );
}

export default Header;
