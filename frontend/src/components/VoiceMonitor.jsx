import React, { useEffect } from 'react';
import SpeechRecognition, { useSpeechRecognition } from 'react-speech-recognition';

const VoiceMonitor = () => {
  const {
    transcript,
    resetTranscript,
    browserSupportsSpeechRecognition,
  } = useSpeechRecognition();

  const dangerKeywords = ['help', 'save me', 'emergency', 'please help'];

  useEffect(() => {
    if (!browserSupportsSpeechRecognition) {
      console.error('Speech Recognition not supported in this browser.');
      return;
    }

    SpeechRecognition.startListening({ continuous: true, language: 'en-IN' });

    return () => {
      SpeechRecognition.stopListening();
    };
  }, []);

  useEffect(() => {
    const transcriptLower = transcript.toLowerCase();
    for (const word of dangerKeywords) {
      if (transcriptLower.includes(word)) {
        alert(`⚠️ Danger word detected: "${word}"`);
        // TODO: Trigger alert to backend here
        resetTranscript(); // Reset to avoid repeated alerts
        break;
      }
    }
  }, [transcript]);

  return (
    <div style={{ display: 'none' }}>
      {/* Hidden UI: Monitoring in background */}
      <p>Listening for danger words...</p>
    </div>
  );
};

export default VoiceMonitor;
