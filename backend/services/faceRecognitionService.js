// backend/services/faceRecognitionService.js
import axios from "axios";

const detectFace = async (image) => {
  // Call to external Face Recognition API, e.g., Face++
  try {
    const response = await axios.post('https://api.faceplusplus.com/face/detect', {
      image_url: image,  // Assuming image is a URL; for base64, send it directly
      api_key: 'YOUR_API_KEY',
      api_secret: 'YOUR_API_SECRET',
    });
    return response.data;
  } catch (error) {
    throw new Error('Face recognition failed');
  }
};
export { detectFace };
