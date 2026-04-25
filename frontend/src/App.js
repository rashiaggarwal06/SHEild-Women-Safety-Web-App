// src/App.js
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import Home from './pages/Home';
import FaceRecognition from './pages/FaceRecognition';
import VoiceDetection from './pages/VoiceDetection';
import LocationTracking from './pages/LocationTracking';
import Login from './pages/Login';
import Signup from './pages/Signup';
import Profile from './pages/Profile';
import VoiceTest from './components/VoiceMonitor.js';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="face-recognition" element={<FaceRecognition />} />
          <Route path="voice-detection" element={<VoiceDetection />} />
          <Route path="location-tracking" element={<LocationTracking />} />
          <Route path="login" element={<Login />} />
          <Route path="signup" element={<Signup />} />
          <Route path="profile" element={<Profile />} /> {/* Profile route */}
          <Route path="voice-test" element={<VoiceTest />} /> {/* ✅ VoiceTest route */}
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
