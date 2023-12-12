import React from 'react';
import styled from 'styled-components';

interface ProgressBarProps {
  countdown: number;
}

const ProgressBarContainer = styled.div<ProgressBarProps>`
  display: flex;
  align-items: center;
  height: 200px;
`;

interface CounterProps {
  countdown: number;
}

const Counter = styled.div<CounterProps>`
  color: #fff;
  font-size: 200px;
`;

interface LoaderProps {
  countdown: number;
}

const Loader: React.FC<LoaderProps> = ({ countdown }) => {
  return (
    <ProgressBarContainer countdown={countdown}>
      <Counter countdown={countdown}>{countdown * 10}%</Counter>
    </ProgressBarContainer>
  );
};

export default Loader;