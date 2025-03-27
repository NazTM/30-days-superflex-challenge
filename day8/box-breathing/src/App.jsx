import React, { useState, useEffect } from 'react';
import './App.css';

function App() {
  const [isBreathing, setIsBreathing] = useState(false);
  const [countdown, setCountdown] = useState(4);
  const [phase, setPhase] = useState('inhale');

  useEffect(() => {
    if (!isBreathing) return;

    const phaseInterval = setInterval(() => {
      setPhase(currentPhase => {
        switch(currentPhase) {
          case 'inhale': return 'hold1';
          case 'hold1': return 'exhale';
          case 'exhale': return 'hold2';
          case 'hold2': return 'inhale';
          default: return 'inhale';
        }
      });
      setCountdown(4); // Reset countdown when phase changes
    }, 4000);

    const countdownInterval = setInterval(() => {
      setCountdown(current => (current > 1 ? current - 1 : 1));
    }, 1000);

    return () => {
      clearInterval(phaseInterval);
      clearInterval(countdownInterval);
    };
  }, [isBreathing]);

  const toggleBreathing = () => {
    setIsBreathing(!isBreathing);
    if (!isBreathing) {
      setPhase('inhale');
      setCountdown(4);
    }
  };

  return (
    <div className="app">
      <div className="breathing-container">
        <div className="label inhale">INHALE</div>
        <div className="label hold-left">HOLD</div>
        <div className="label hold-right">HOLD</div>
        <div className="label exhale">EXHALE</div>
        
        <div className="breathing-box">
          <div className={`breathing-circle ${isBreathing ? `animate ${phase}` : ''}`}></div>
          <div className="number">{isBreathing ? countdown : 4}</div>
        </div>
      </div>

      <button className="start-button" onClick={toggleBreathing}>
        {isBreathing ? 'STOP' : 'START'}
      </button>
    </div>
  );
}

export default App;
