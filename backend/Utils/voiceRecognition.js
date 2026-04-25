// Example utility to handle voice recognition logic
import { SpeechClient } from '@google-cloud/speech';

// Setup the Google Cloud Speech-to-Text client
const client = new SpeechClient();

export const processVoiceCommand = async (audioData) => {
  try {
    const audioBytes = audioData; // Ensure this is base64-encoded audio data

    const request = {
      audio: {
        content: audioBytes,
      },
      config: {
        encoding: 'LINEAR16',
        sampleRateHertz: 16000,
        languageCode: 'en-US',
      },
    };

    const [response] = await client.recognize(request);
    const transcription = response.results
      .map(result => result.alternatives[0].transcript)
      .join('\n');

    if (transcription.length > 0) {
      return { success: true, transcription };
    } else {
      return { success: false, message: 'No voice command detected' };
    }
  } catch (error) {
    throw new Error('Error in voice recognition: ' + error.message);
  }
};
