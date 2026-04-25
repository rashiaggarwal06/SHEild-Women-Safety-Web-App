import React from 'react';

const AlertButton = () => {
  const handleClick = () => {
    alert("Emergency Alert Sent!");
    // Later: Add backend call for real alert
  };

  return (
    <button className="alert-btn" onClick={handleClick}>
      🚨 Send Emergency Alert
    </button>
  );
};

export default AlertButton;