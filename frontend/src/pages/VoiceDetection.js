function parseJwt(token) {
  try {
    const base64Url = token.split('.')[1];
    const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    const jsonPayload = decodeURIComponent(
      atob(base64)
        .split('')
        .map(c => '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2))
        .join('')
    );
    return JSON.parse(jsonPayload);
  } catch (e) {
    return null;
  }
}


import React, { useState, useEffect, useRef } from 'react';
import './VoiceDetection.css';
import { saveVoiceAlert } from '../services/userService';

const VoiceDetection = () => {
  const [isRecording, setIsRecording] = useState(false);
  const [detectedText, setDetectedText] = useState('');
  const [isVoiceDetected, setIsVoiceDetected] = useState(false);
  const recognitionRef = useRef(null);

  useEffect(() => {
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    const recognition = new SpeechRecognition();
    recognitionRef.current = recognition;

    recognition.continuous = true;
    recognition.interimResults = false;
    recognition.lang = 'en-US';

    const token = localStorage.getItem('token');
const decoded = parseJwt(token);
const userId = decoded ? decoded.id : null;

console.log('userId:', userId, 'token:', token);



    recognition.onstart = () => {
      setIsRecording(true);
      console.log("🎙️ Recording started");
    };

    recognition.onend = () => {
      setIsRecording(false);
      console.log("🛑 Recording stopped");
    };

    recognition.onresult = async (event) => {
      const transcript = event.results[event.results.length - 1][0].transcript.trim().toLowerCase();
      console.log("🎤 Detected Transcript:", transcript);
      setDetectedText(transcript);

      if (transcript.includes('help') || transcript.includes('emergency')) {
        setIsVoiceDetected(true);

        if (!userId || !token) {
          console.error("❌ Missing userId or token");
          return;
        }

        try {
          const response = await saveVoiceAlert({ userId, detectedText: transcript }, token);
          console.log("✅ Voice Alert Sent:", response.data);
        } catch (error) {
          console.error("❌ Error saving alert:", error);
        }

        setTimeout(() => {
          setIsVoiceDetected(false); // Hide alert after 5 seconds
        }, 5000);
      }
    };

    return () => recognition.stop(); // Cleanup
  }, []);

  // ✅ Define the missing handler
  const handleRecordingToggle = () => {
    const recognition = recognitionRef.current;
    if (!recognition) return;

    if (isRecording) {
      recognition.stop();
    } else {
      recognition.start();
    }
  };

  return (
    <div className="voice-detection page">
      <h2>Voice Detection</h2>
      <p>Enhance your safety with automatic voice detection. Detect emergency commands in real-time!</p>

      <div className="recording-control">
        <button
          className={isRecording ? 'btn stop' : 'btn start'}
          onClick={handleRecordingToggle}
        >
          {isRecording ? 'Stop Recording' : 'Start Recording'}
        </button>
      </div>

      <section className="how-it-works">
        <div className="how-it-box">
          <h3>Automatic Voice Detection</h3>
          <p>Our system constantly listens for emergency phrases like "Help" or "Emergency".</p>
        </div>
        <div className="how-it-box">
          <h3>Real-Time Recognition</h3>
          <p>We use speech recognition to detect and transcribe voice commands instantly.</p>
        </div>
        <div className="how-it-box">
          <h3>Instant Alerts</h3>
          <p>On detection, the system sends alerts to your emergency contacts immediately.</p>
        </div>
      </section>

      <div className="detected-voice-info">
        <h3>Detected Voice:</h3>
        <p>{detectedText || 'Listening for voice commands...'}</p>
        {isVoiceDetected && (
          <div className="alert-message">
            <h4>🚨 Emergency Detected!</h4>
            <p>Sending alert...</p>
          </div>
        )}
      </div>

      <div className="coming-soon-banner">
        <p>🚧 Feature coming soon 🚀</p>
      </div>
    </div>
  );
};

export default VoiceDetection;
