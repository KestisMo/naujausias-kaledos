import React from 'react';
import styled from 'styled-components';

const Ball = ({ index }) => {
  const BallWrapper = styled.div`
    position: absolute;
    width: 300px;
    height: 300px;
    background-color: #ff0000; /* Set your desired color */
    border-radius: 50%;
    transform-origin: center bottom;
    left: ${index * 200}px; /* Adjust as needed */
  `;

  return (
    <BallWrapper>
      <img
        src={process.env.PUBLIC_URL + '/koliazas.png'}
        alt='kuoma'
        style={{ width: '100%', height: '100%', borderRadius: '50%' }}
      />
    </BallWrapper>
  );
};

export default Ball;
