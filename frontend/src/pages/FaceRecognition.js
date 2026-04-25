// import React, { useState, useEffect } from 'react';
// import './FaceRecognition.css';
// import * as faceapi from 'face-api.js';
// import axios from 'axios';
// import { v4 as uuidv4 } from 'uuid';

// const FaceRecognition = () => {
//   const [image, setImage] = useState(null);
//   const [file, setFile] = useState(null);
//   const [isFaceDetected, setIsFaceDetected] = useState(false);
//   const [message, setMessage] = useState('Upload an image to detect face');
//   const [loading, setLoading] = useState(false);
//   const [modelsLoaded, setModelsLoaded] = useState(false);

//   useEffect(() => {
//     const loadModels = async () => {
//       try {
//         await faceapi.nets.ssdMobilenetv1.loadFromUri('/models');
//         await faceapi.nets.faceLandmark68Net.loadFromUri('/models');
//         await faceapi.nets.faceRecognitionNet.loadFromUri('/models');
//         setModelsLoaded(true);
//         console.log('✅ All models loaded');
//       } catch (err) {
//         console.error('❌ Error loading models:', err);
//       }
//     };
//     loadModels();
//   }, []);

//   const handleImageUpload = (e) => {
//     const selectedFile = e.target.files[0];
//     if (selectedFile) {
//       setImage(URL.createObjectURL(selectedFile));
//       setFile(selectedFile);
//       if (modelsLoaded) {
//         detectFace(selectedFile);
//       } else {
//         setMessage('⏳ Please wait, loading models...');
//       }
//     }
//   };

//   const detectFace = async (file) => {
//     setLoading(true);
//     setMessage('Detecting face...');
//     const img = document.createElement('img');
//     img.src = URL.createObjectURL(file);

//     img.onload = async () => {
//       const detections = await faceapi
//         .detectAllFaces(img)
//         .withFaceLandmarks()
//         .withFaceDescriptors();

//       if (detections.length > 0) {
//         setIsFaceDetected(true);
//         setMessage('✅ Face detected! Uploading to server...');

//         // Convert image to blob using canvas
//         const canvas = document.createElement('canvas');
//         canvas.width = img.width;
//         canvas.height = img.height;
//         const ctx = canvas.getContext('2d');
//         ctx.drawImage(img, 0, 0);

//         canvas.toBlob(async (blob) => {
//           if (blob) {
//             await uploadFaceToServer(blob, detections);
//           } else {
//             setMessage('❌ Failed to convert image to Blob');
//           }
//         }, 'image/jpeg');
//       } else {
//         setIsFaceDetected(false);
//         setMessage('❌ No face detected. Please try another image.');
//         setLoading(false);
//       }
//     };
//   };
// const uploadFaceToServer = async (file, detections) => {
//   try {
//     const formData = new FormData();
//     formData.append('image', file);
//     formData.append('descriptors', JSON.stringify(detections.map(d => d.descriptor)));

//     const token = localStorage.getItem('token');

//     const res = await axios.post(
//       'http://localhost:5000/api/face-recognition/save-face-data',
//       formData,
//       {
//         headers: {
//           'Content-Type': 'multipart/form-data',
//           Authorization: `Bearer ${token}`,
//         }
//       }
//     );

//     // ✅ Update message and stop loading
//     setMessage('✅ Face data uploaded successfully!');
//     setLoading(false);
//   } catch (err) {
//     console.error('❌ Upload error:', err);
//     setMessage('❌ Failed to upload face data. Please try again.');
//     setLoading(false);
//   }
// };


//   return (
//     <div className="face-recognition page">
//       <h2>Face Recognition</h2>
//       <p>Enhance your security with advanced face recognition technology.</p>

//       <div className="image-upload">
//         <input
//           type="file"
//           accept="image/*"
//           onChange={handleImageUpload}
//           id="upload-image"
//         />
//         <label htmlFor="upload-image">Choose Image</label>
//       </div>

//       {image && <img src={image} alt="Uploaded" className="uploaded-image" />}

//       <div className="detection-message">
//         {loading ? <p>⏳ Processing...</p> : <p>{message}</p>}
//       </div>

//       <section className="how-it-works">
//         <div className="how-it-box">
//           <h3>Upload Image</h3>
//           <p>Upload a clear image and let the system scan for faces.</p>
//         </div>
//         <div className="how-it-box">
//           <h3>Automatic Detection</h3>
//           <p>We use facial landmarks and descriptors to detect identity.</p>
//         </div>
//         <div className="how-it-box">
//           <h3>Data Storage</h3>
//           <p>Detected faces are securely saved for future verification.</p>
//         </div>
//       </section>

//       <div className="coming-soon-banner">
//         <p>🚧 More face recognition features coming soon!</p>
//       </div>
//     </div>
//   );
// };

// export default FaceRecognition;




import React, { useState, useEffect, useRef } from 'react';
import './FaceRecognition.css';
import * as faceapi from 'face-api.js';
import axios from 'axios';
import Webcam from 'react-webcam';

const FaceRecognition = () => {
  const [imageSrc, setImageSrc] = useState(null);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('Upload or capture an image to detect face');
  const [modelsLoaded, setModelsLoaded] = useState(false);
  const webcamRef = useRef(null);

  useEffect(() => {
    const loadModels = async () => {
      try {
        await faceapi.nets.ssdMobilenetv1.loadFromUri('/models');
        await faceapi.nets.faceLandmark68Net.loadFromUri('/models');
        await faceapi.nets.faceRecognitionNet.loadFromUri('/models');
        setModelsLoaded(true);
        console.log('✅ Models loaded');
      } catch (err) {
        console.error('❌ Error loading models:', err);
      }
    };
    loadModels();
  }, []);

  // 📁 Handle file upload
  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const url = URL.createObjectURL(file);
      setImageSrc(url);
      detectFaceFromImage(url, file);
    }
  };

  // 📸 Handle camera capture
  const handleCapture = () => {
    if (!webcamRef.current) return;
    const screenshot = webcamRef.current.getScreenshot();
    if (screenshot) {
      setImageSrc(screenshot);
      processCapturedImage(screenshot);
    }
  };

  // 🎯 Detect face from uploaded file
  const detectFaceFromImage = async (imgUrl, file) => {
    setLoading(true);
    setMessage('Detecting face...');
    const img = new Image();
    img.src = imgUrl;

    img.onload = async () => {
      const detections = await faceapi
        .detectAllFaces(img)
        .withFaceLandmarks()
        .withFaceDescriptors();

      if (detections.length > 0) {
        setMessage('✅ Face detected. Uploading...');
        uploadFaceToServer(file, detections);
      } else {
        setMessage('❌ No face detected. Try another image.');
        setLoading(false);
      }
    };
  };

  // 🎯 Detect face from captured webcam image
  const processCapturedImage = async (base64Image) => {
    setLoading(true);
    setMessage('Detecting face...');
    const img = new Image();
    img.src = base64Image;

    img.onload = async () => {
      const detections = await faceapi
        .detectAllFaces(img)
        .withFaceLandmarks()
        .withFaceDescriptors();

      if (detections.length > 0) {
        setMessage('✅ Face detected. Uploading...');
        // Convert base64 to Blob
        const blob = await (await fetch(base64Image)).blob();
        uploadFaceToServer(blob, detections);
      } else {
        setMessage('❌ No face detected. Try again.');
        setLoading(false);
      }
    };
  };

  // ⬆️ Upload image + face descriptors to backend
  const uploadFaceToServer = async (file, detections) => {
    try {
      const formData = new FormData();
      formData.append('image', file);
      formData.append('descriptors', JSON.stringify(detections.map(d => d.descriptor)));

      const token = localStorage.getItem('token');

      await axios.post(
        'http://localhost:5000/api/face-recognition/save-face-data',
        formData,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setMessage('✅ Face data uploaded successfully!');
    } catch (err) {
      console.error('❌ Upload error:', err);
      setMessage('❌ Failed to upload. Try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="face-recognition page">
      <h2>Face Recognition</h2>
      <p>Upload or capture an image for secure face verification.</p>

      <div className="image-upload">
        <input
          type="file"
          accept="image/*"
          onChange={handleFileUpload}
          id="upload-image"
        />
        <label htmlFor="upload-image">📁 Upload Image</label>
      </div>

      <div className="webcam-section">
        <Webcam
          audio={false}
          ref={webcamRef}
          screenshotFormat="image/jpeg"
          width={320}
          height={240}
          videoConstraints={{ facingMode: 'user' }}
        />
        <button onClick={handleCapture}>📸 Capture From Camera</button>
      </div>

      {imageSrc && <img src={imageSrc} alt="Captured/Uploaded" className="uploaded-image" />}

      <div className="detection-message">
        {loading ? <p>⏳ Processing...</p> : <p>{message}</p>}
      </div>

      <section className="how-it-works">
        <div className="how-it-box">
          <h3>Upload or Capture</h3>
          <p>Provide a clear image through camera or upload.</p>
        </div>
        <div className="how-it-box">
          <h3>Face Detection</h3>
          <p>face-api.js detects facial features and descriptors.</p>
        </div>
        <div className="how-it-box">
          <h3>Data Saved</h3>
          <p>Face data securely saved to MongoDB for verification.</p>
        </div>
      </section>

      <div className="coming-soon-banner">
        <p>🚧 More smart features coming soon!</p>
      </div>
    </div>
  );
};

export default FaceRecognition;
