import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';
import styled from 'styled-components';

const TimerContainer = styled.div`
  position: fixed;
  top: 20px;
  right: 20px;
  background-color: #2d2d2d;
  padding: 16px;
  border-radius: 8px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.2);
  display: flex;
  align-items: center;
  gap: 16px;
  color: white;
`;

const ProgressCircle = styled.div`
  position: relative;
  width: 60px;
  height: 60px;
`;

const CircleBackground = styled.svg`
  transform: rotate(-90deg);
  width: 60px;
  height: 60px;
`;

const CirclePath = styled.circle`
  fill: none;
  stroke: ${props => props.color};
  stroke-width: 4;
  stroke-dasharray: ${props => props.dashArray};
  stroke-dashoffset: ${props => props.dashOffset};
  transition: stroke-dashoffset 0.3s ease;
`;

const Percentage = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  font-size: 12px;
  color: #999;
`;

const TimeDisplay = styled.div`
  display: flex;
  flex-direction: column;
  gap: 4px;
`;

const Label = styled.div`
  font-size: 12px;
  color: #999;
  text-transform: uppercase;
  letter-spacing: 1px;
`;

const Time = styled.div`
  font-size: 20px;
  font-weight: bold;
  color: ${props => props.isWarning ? '#ff9800' : props.isDanger ? '#f44336' : '#4CAF50'};
`;

const Timer = ({ duration, onTimeUp }) => {
  const [timeLeft, setTimeLeft] = useState(duration);

  useEffect(() => {
    if (timeLeft <= 0) {
      onTimeUp();
      return;
    }

    const timer = setInterval(() => {
      setTimeLeft(prev => prev - 1);
    }, 1000);

    return () => clearInterval(timer);
  }, [timeLeft, onTimeUp]);

  const formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`;
  };

  const percentage = (timeLeft / duration) * 100;
  const circumference = 2 * Math.PI * 27; // Circle radius is 27 (60/2 - stroke width)
  const dashOffset = circumference * (1 - percentage / 100);
  
  const getColor = () => {
    if (timeLeft <= 60) return '#f44336';
    if (timeLeft <= 180) return '#ff9800';
    return '#4CAF50';
  };

  return (
    <motion.div
      initial={{ x: 100, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <TimerContainer>
        <ProgressCircle>
          <CircleBackground>
            <CirclePath
              cx="30"
              cy="30"
              r="27"
              color={getColor()}
              dashArray={circumference}
              dashOffset={dashOffset}
            />
          </CircleBackground>
          <Percentage>
            {Math.round(percentage)}%
          </Percentage>
        </ProgressCircle>
        <TimeDisplay>
          <Label>Time Left</Label>
          <Time 
            isWarning={timeLeft <= 180} 
            isDanger={timeLeft <= 60}
          >
            {formatTime(timeLeft)}
          </Time>
        </TimeDisplay>
      </TimerContainer>
    </motion.div>
  );
};

export default Timer;