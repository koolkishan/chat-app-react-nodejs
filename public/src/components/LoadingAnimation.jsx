import React from 'react';
import './loadinganimation.css';

const LoadingAnimation = () => {
  return (
    <div className="loading-animation">
      <div className="arc"></div>
      <h1 id="h1_of_loading"><span>LOADING</span></h1>
    </div>
  );
};

export default LoadingAnimation;