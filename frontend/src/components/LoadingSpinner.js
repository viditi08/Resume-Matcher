import React from 'react';

function LoadingSpinner({ message }) {
  return (
    <div className="loading-spinner">
      <div className="spinner"></div>
      <p>{message || 'Loading...'}</p>
    </div>
  );
}

export default LoadingSpinner;