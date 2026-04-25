// src/components/Footer.js
import React from 'react';
import facebookIcon from '../assets/facebook-icon.png';
import twitterIcon from '../assets/twitter-icon.png';
import instagramIcon from '../assets/instagram-icon.png';
import './Footer.css'; // Make sure this CSS exists

function Footer() {
  return (
    <footer className="footer">
      <p>&copy; 2025 Women's Safety App. All Rights Reserved.</p>
      <div className="social-links">
        <a href="https://www.facebook.com" target="_blank" rel="noopener noreferrer">
          <img src={facebookIcon} alt="Facebook" className="social-icon" />
        </a>
        <a href="https://twitter.com" target="_blank" rel="noopener noreferrer">
          <img src={twitterIcon} alt="Twitter" className="social-icon" />
        </a>
        <a href="https://www.instagram.com" target="_blank" rel="noopener noreferrer">
          <img src={instagramIcon} alt="Instagram" className="social-icon" />
        </a>
      </div>
    </footer>
  );
}

export default Footer;