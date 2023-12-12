import React, { useState, useEffect } from 'react';
import Ball from '../Ball/Ball'; // Import the Ball component
import './Gift.scss';

const Gift = () => {
  const [counts, setCounts] = useState(1);
  const [ballsCount, setBallsCount] = useState(0);
  const countsNeeded = 2;
  const maxBalls = 1;

  useEffect(() => {
    if (counts >= countsNeeded) {
      const interval = setInterval(() => {
        setBallsCount((prevCount) => {
          if (prevCount < maxBalls) {
            return prevCount + 1;
          } else {
            clearInterval(interval);
            return prevCount;
          }
        });
      }, 1000); 

      return () => clearInterval(interval);
    }
  }, [counts]);

  const handleClick = () => {
    setCounts((prevCounts) => prevCounts + 1);

    if (counts >= countsNeeded) {
      // You can perform any additional actions when the gift is opened
      console.log('Gift is opened!');
    }
  };

  const renderBalls = (): JSX.Element => {
    return <Ball index={undefined} />;
  };

  return (
    <div className={`present ${counts >= countsNeeded ? 'open' : ''}`} onClick={handleClick}>
      <div className="gift">
        {counts >= countsNeeded && renderBalls()}
      </div>

      <div className="wiggle-container">
        <div className="rotate-container">
          <div className="bottom"></div>
          <div className="front"></div>
          <div className="left"></div>
          <div className="back"></div>
          <div className="right"></div>

          <div className="lid">
            <div className="lid-top"></div>
            <div className="lid-front"></div>
            <div className="lid-left"></div>
            <div className="lid-back"></div>
            <div className="lid-right"></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Gift;
