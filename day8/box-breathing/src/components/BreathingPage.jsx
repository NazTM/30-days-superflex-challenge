import React, { useState, useEffect, useRef } from 'react';
import Button from './Button';
import './BreathingPage.css';

const BreathingPage = ({ onAboutClick }) => {
  const [isBreathing, setIsBreathing] = useState(false);
  const [currentPhase, setCurrentPhase] = useState('inhale');
  const animationRef = useRef(null);

  useEffect(() => {
    if (!isBreathing) return;

    const phases = ['inhale', 'hold1', 'exhale', 'hold2'];
    let currentIndex = phases.indexOf(currentPhase);
    
    const interval = setInterval(() => {
      currentIndex = (currentIndex + 1) % 4;
      setCurrentPhase(phases[currentIndex]);
    }, 4000);

    return () => clearInterval(interval);
  }, [isBreathing, currentPhase]);

  const toggleBreathing = () => {
    setIsBreathing(!isBreathing);
    if (!isBreathing) {
      setCurrentPhase('inhale');
      if (animationRef.current) {
        animationRef.current.style.animation = 'none';
        // Trigger reflow
        void animationRef.current.offsetWidth;
        animationRef.current.style.animation = 'moveCircle 16s linear infinite';
      }
    } else {
      if (animationRef.current) {
        animationRef.current.style.animation = 'none';
      }
    }
  };

  return (
    <div className="breathing-page">
      <div className="about-button-container">
        <Button text="ABOUT" onClick={onAboutClick} />
      </div>
      
      <div className="breathing-container">
        <div className="label inhale">INHALE</div>
        <div className="label hold-left">HOLD</div>
        <div className="label exhale">EXHALE</div>
        <div className="label hold-right">HOLD</div>
        
        <div className="breathing-box">
          <div 
            ref={animationRef} 
            className={`breathing-circle ${isBreathing ? 'animate' : ''}`}
          />
          <div className="number">4</div>
        </div>
      </div>
      
      <div className="start-button-container">
        <Button 
          text={isBreathing ? "STOP" : "START"} 
          onClick={toggleBreathing} 
        />
      </div>
    </div>
  );
};

export default BreathingPage;
