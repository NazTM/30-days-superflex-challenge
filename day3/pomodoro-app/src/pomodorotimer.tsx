import React, { useState, useEffect, useRef } from 'react';
import './PomodoroTimer.css';

const POMODORO_TIME = 25 * 60; // 25 minutes
const BREAK_TIME = 5 * 60; // 5 minutes

const PomodoroTimer: React.FC = () => {
  const [timeLeft, setTimeLeft] = useState<number>(0); // Start at 00:00
  const [isActive, setIsActive] = useState<boolean>(false);
  const [isBreak, setIsBreak] = useState<boolean>(false);
  const [buttonText, setButtonText] = useState<string>("START");
  
  const circleRef = useRef<HTMLDivElement>(null);
  
  const formatTime = (seconds: number): string => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')} : ${secs.toString().padStart(2, '0')}`;
  };
  
  const toggleTimer = () => {
    if (!isActive && timeLeft === 0) {
      // Start new timer
      setTimeLeft(POMODORO_TIME);
      setIsActive(true);
      setButtonText("STOP");
    } else if (isActive) {
      // Stop the timer
      setIsActive(false);
      setButtonText("START");
    } else {
      // Resume timer
      setIsActive(true);
      setButtonText("STOP");
    }
  };
  
  const startBreak = () => {
    setIsActive(false);
    setIsBreak(true);
    setTimeLeft(BREAK_TIME);
    setButtonText("START");
  };
  
  const resetTimer = () => {
    setIsActive(false);
    setIsBreak(false);
    setTimeLeft(0);
    setButtonText("START");
    
    if (circleRef.current) {
      circleRef.current.style.transform = 'rotate(0deg)';
    }
  };
  
  const updateCirclePosition = () => {
    if (!circleRef.current) return;
    
    const totalTime = isBreak ? BREAK_TIME : POMODORO_TIME;
    const progress = 1 - (timeLeft / totalTime);
    const degrees = progress * 360;
    
    circleRef.current.style.transform = `rotate(${degrees}deg)`;
  };
  
  useEffect(() => {
    let interval: NodeJS.Timeout | null = null;
    
    if (isActive && timeLeft > 0) {
      interval = setInterval(() => {
        setTimeLeft(timeLeft - 1);
        updateCirclePosition();
      }, 1000);
    } else if (timeLeft === 0 && isActive) {
      setIsActive(false);
      setButtonText("START");
      
      if (isBreak) {
        setIsBreak(false);
      }
      
      // Optional: Add a notification sound file to public folder
      // const audio = new Audio('/notification.mp3');
      // audio.play().catch(e => console.log('Audio play failed:', e));
    }
    
    return () => {
      if (interval) clearInterval(interval);
    };
  }, [isActive, timeLeft, isBreak]);
  
  useEffect(() => {
    updateCirclePosition();
  }, [isBreak]);
  
  return (
    <div className="pomodoro-container">
      <div className="background-image"></div>
      
      <div className="timer-circle">
        <div 
          ref={circleRef} 
          className="circle-indicator"
        ></div>
        
        <div className="timer-display">
          {formatTime(timeLeft)}
        </div>
        
        <div className="buttons-container">
          <button 
            className="timer-button main-button"
            onClick={toggleTimer}
          >
            {buttonText}
          </button>
          
          {!isBreak && timeLeft === 0 && (
            <button 
              className="timer-button break-button"
              onClick={startBreak}
            >
              BREAK
            </button>
          )}
          
          <button 
            className="timer-button reset-button"
            onClick={resetTimer}
          >
            RESET
          </button>
        </div>
      </div>
    </div>
  );
};

export default PomodoroTimer;