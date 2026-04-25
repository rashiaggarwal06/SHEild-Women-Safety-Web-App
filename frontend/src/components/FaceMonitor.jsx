import React, { useEffect, useRef } from 'react';
import * as faceapi from 'face-api.js';
import axios from 'axios';

const FaceMonitor = () => {
  const videoRef = useRef();
 
  const loadModels = async () => {
    const MODEL_URL = '/models';
    await faceapi.nets.tinyFaceDetector.loadFromUri(MODEL_URL);
    await faceapi.nets.faceRecognitionNet.loadFromUri(MODEL_URL);
    await faceapi.nets.faceLandmark68Net.loadFromUri(MODEL_URL);
  };

  const startVideo = () => {
    navigator.mediaDevices
      .getUserMedia({ video: true })
      .then((stream) => {
        videoRef.current.srcObject = stream;
      })
      .catch((err) => console.error('Error accessing webcam:', err));
  };

  const monitorFace = async () => {
    const labeledDescriptors = await loadLabeledImages(); // function defined below
    const faceMatcher = new faceapi.FaceMatcher(labeledDescriptors, 0.6);

    videoRef.current.addEventListener('play', () => {
      const canvas = faceapi.createCanvasFromMedia(videoRef.current);
      document.body.append(canvas);
      const displaySize = {
        width: videoRef.current.videoWidth,
        height: videoRef.current.videoHeight,
      };
      faceapi.matchDimensions(canvas, displaySize);

      setInterval(async () => {
        const detections = await faceapi
          .detectAllFaces(videoRef.current, new faceapi.TinyFaceDetectorOptions())
          .withFaceLandmarks()
          .withFaceDescriptors();

        const resizedDetections = faceapi.resizeResults(detections, displaySize);
        canvas.getContext('2d').clearRect(0, 0, canvas.width, canvas.height);

        const results = resizedDetections.map((d) => {
          return faceMatcher.findBestMatch(d.descriptor);
        });

        results.forEach((result, i) => {
          const box = resizedDetections[i].detection.box;
          const { label } = result;

          faceapi.draw.drawDetections(canvas, resizedDetections);

          if (label === 'unknown') {
            triggerDangerAlert();
          }
        });
      }, 3000); // every 3 seconds
    });
  };

  const triggerDangerAlert = async () => {
    try {
      await axios.post('/api/alert', {
        type: 'Unknown face detected',
        location: 'auto', // add logic to get coordinates
      });
      console.log('ALERT triggered!');
    } catch (err) {
      console.error('Failed to trigger alert:', err);
    }
  };

  const loadLabeledImages = () => {
    const labels = ['User']; // Your saved face name(s)
    return Promise.all(
      labels.map(async (label) => {
        const imgUrl = `/known_faces/${label}.jpg`; // Put image in public folder
        const img = await faceapi.fetchImage(imgUrl);
        const detections = await faceapi
          .detectSingleFace(img)
          .withFaceLandmarks()
          .withFaceDescriptor();
        return new faceapi.LabeledFaceDescriptors(label, [detections.descriptor]);
      })
    );
  };

  useEffect(() => {
    loadModels().then(startVideo).then(monitorFace);
  }, []);

  return (
    <div>
      <video ref={videoRef} autoPlay muted width="720" height="560" />
    </div>
  );
};

export default FaceMonitor;
