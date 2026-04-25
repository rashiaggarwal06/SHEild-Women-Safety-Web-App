import React from 'react';
import Webcam from 'react-webcam';
import './Monitor.css';

const videoConstraints = {
  width: 400,
  height: 300,
  facingMode: "user",
};

const FaceMonitor = () => {
  return (
    <div className="monitor-container">
      <h2>Face Recognition Monitor</h2>
      <div className="monitor-box">
        <Webcam
          audio={false}
          height={300}
          screenshotFormat="image/jpeg"
          width={400}
          videoConstraints={videoConstraints}
        />
        <p>Camera is active. Face recognition will be applied here.</p>
      </div>
    </div>
  );
};

export default FaceMonitor;
