import React, { useEffect, useState } from 'react';

const VoiceMonitor = () => {
  const [transcript, setTranscript] = useState('');
  const [listening, setListening] = useState(false);

  useEffect(() => {
    const SpeechRecognition =
      window.SpeechRecognition || window.webkitSpeechRecognition;

    if (!SpeechRecognition) {
      alert('Your browser does not support Speech Recognition.');
      return;
    }

    const recognition = new SpeechRecognition();
    recognition.continuous = true;
    recognition.lang = 'en-US';

    recognition.onstart = () => setListening(true);
    recognition.onend = () => setListening(false);
    recognition.onerror = (e) => console.error('Speech Recognition Error:', e);

    recognition.onresult = async (event) => {
      const current = event.resultIndex;
      const transcriptText = event.results[current][0].transcript;
      setTranscript((prev) => prev + ' ' + transcriptText);

      // ✅ If 'help' is detected, send to backend
      if (transcriptText.toLowerCase().includes('help')) {
        alert('🆘 Help command detected! Sending alert...');
        console.log("Attempting to send POST to backend for voice alert...");

        try {
          const token = localStorage.getItem('token'); // adjust if using cookies or context
          const res = await fetch('http://localhost:5000/api/voice-detection', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              Authorization: `Bearer ${token}`, // if using JWT
            },
            body: JSON.stringify({ message: transcriptText }),
          });

          const data = await res.json();
          console.log('Voice alert sent:', data);
        } catch (error) {
          console.error('Error sending voice alert:', error);
        }
      }
    };

    recognition.start();

    return () => recognition.stop();
  }, []);

  return (
    <div className="monitor-container">
      <h2>Voice Command Monitor</h2>
      <p>Status: {listening ? '🎙️ Listening...' : '🔇 Not listening'}</p>
      <div className="monitor-box">
        <p><strong>Transcript:</strong> {transcript}</p>
      </div>
    </div>
  );
};
export default VoiceMonitor;