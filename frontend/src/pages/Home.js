import React from 'react';
import './Home.css';
import FaceMonitor from '../components/FaceMonitor';
import VoiceMonitor from '../components/VoiceMonitor';
import facebookIcon from '../assets/facebook-icon.png';
import twitterIcon from '../assets/twitter-icon.png';
import instagramIcon from '../assets/instagram-icon.png';
import VoiceImage from '../assets/voice-detection-icon.jpg';
import faceImage from '../assets/face-recognition-icon.jpg';
import locationImage from '../assets/location-tracking-icon.jpg';

function Home() {
  return (
    <div className="home">
      {/* Hero Section */}
      <section className="hero">
        <div className="hero-text">
          <h1>Welcome to Women's Safety App</h1>
          <p>
            Empowering women through innovative technology, providing a safe and secure environment, and helping them take control of their safety and well-being in today's world.
          </p>
          <button className="cta-button">Get Started</button>
        </div>
      </section>

      {/* Features Section */}
      <section className="features">
        <h2>Our Key Features</h2>
        <div className="feature-items">
          <div className="feature-item">
            <img src={faceImage} alt="Face Recognition" />
            <h3>Face Recognition</h3>
            <p>Unlock advanced security with facial recognition technology.</p>
          </div>
          <div className="feature-item">
            <img src={VoiceImage} alt="Voice Detection" />
            <h3>Voice Detection</h3>
            <p>Activate safety features with simple voice commands.</p>
          </div>
          <div className="feature-item">
            <img src={locationImage} alt="Location Tracking" />
            <h3>Location Tracking</h3>
            <p>Real-time location tracking for peace of mind.</p>
          </div>
        </div>
      </section>

      {/* Face Monitor Section */}
      <section className="monitor-section">
        <h2>Live Face Recognition</h2>
        <p>Scan your face to verify identity or detect threats in real time.</p>
        <div className="monitor-box">
          <FaceMonitor />
        </div>
      </section>

      {/* Voice Monitor Section */}
      <section className="monitor-section">
        <h2>Voice Command Detection</h2>
        <p>Speak distress keywords to instantly trigger an emergency alert.</p>
        <div className="monitor-box">
          <VoiceMonitor />
        </div>
      </section>
    </div>
  );
}

export default Home;
