// Example utility to handle facial recognition logic
import * as faceapi from 'face-api.js';

const loadModels = async () => {
  const MODEL_URL = './models'; // Path to the models folder
  await faceapi.nets.ssdMobilenetv1.loadFromUri(MODEL_URL);
  await faceapi.nets.faceLandmark68Net.loadFromUri(MODEL_URL);
  await faceapi.nets.faceRecognitionNet.loadFromUri(MODEL_URL);
};

export const recognizeFace = async (image) => {
  try {
    await loadModels(); // Load models first

    const img = await faceapi.bufferToImage(image);
    const detections = await faceapi.detectSingleFace(img).withFaceLandmarks().withFaceDescriptor();

    if (detections) {
      return { success: true, detections };
    } else {
      return { success: false, message: 'No face detected' };
    }
  } catch (error) {
    throw new Error('Error in facial recognition: ' + error.message);
  }
};