import React, { useState } from 'react';
import './RockPaperScissors.css';

const RockPaperScissors = () => {
  const [playerScore, setPlayerScore] = useState(0);
  const [computerScore, setComputerScore] = useState(0);
  const [playerChoice, setPlayerChoice] = useState(null);
  const [computerChoice, setComputerChoice] = useState(null);
  const [outcome, setOutcome] = useState(null);
  const [showOutline, setShowOutline] = useState(null);

  const choices = ['rock', 'paper', 'scissors'];
  
  const imageUrls = {
    rock: 'https://figma-alpha-api.s3.us-west-2.amazonaws.com/images/9b1396d0-5176-4072-bac8-6d3cbae4f547',
    paper: 'https://figma-alpha-api.s3.us-west-2.amazonaws.com/images/3bd6b85d-204e-445d-8b77-4eaac9ddedb8',
    scissors: 'https://figma-alpha-api.s3.us-west-2.amazonaws.com/images/577c6154-e958-46bd-b474-68fc4c5c3291'
  };

  const determineWinner = (player, computer) => {
    if (player === computer) return 'Draw';
    
    if (
      (player === 'rock' && computer === 'scissors') ||
      (player === 'scissors' && computer === 'paper') ||
      (player === 'paper' && computer === 'rock')
    ) {
      return 'Win';
    }
    
    return 'Loss';
  };

  const handleChoice = (choice) => {
    // Player's choice
    setPlayerChoice(choice);
    
    // Computer's random choice
    const randomIndex = Math.floor(Math.random() * 3);
    const computerSelection = choices[randomIndex];
    setComputerChoice(computerSelection);
    
    // Determine the outcome
    const result = determineWinner(choice, computerSelection);
    setOutcome(result);
    
    // Update scores
    if (result === 'Win') {
      setPlayerScore(prevScore => prevScore + 1);
      setShowOutline('player');
    } else if (result === 'Loss') {
      setComputerScore(prevScore => prevScore + 1);
      setShowOutline('computer');
    } else {
      setShowOutline('both');
    }
  };

  return (
    <div className="game-container">
      {/* Score Display */}
      <div className="score-container">
        <div className="score-label">You</div>
        <div className="score">
          <span className="player-score">{playerScore}</span>
          :
          <span className="computer-score">{computerScore}</span>
        </div>
        <div className="score-label">PC</div>
      </div>

      {/* Instructions */}
      <div className="instructions">
        <p>Rock beats scissors, scissors beat paper, paper beats rock</p>
        <p>Click on any of the squares below to begin playing. Blue outline = You, Red = PC, Yellow = Draw.</p>
      </div>

      {/* Game Choices */}
      <div className="choices-container">
        <div 
          className={`choice-box ${playerChoice === 'rock' && showOutline === 'player' ? 'player-selected' : ''} ${computerChoice === 'rock' && showOutline === 'computer' ? 'computer-selected' : ''} ${playerChoice === 'rock' && computerChoice === 'rock' && showOutline === 'both' ? 'draw-selected' : ''}`}
          onClick={() => handleChoice('rock')}
        >
          <img src={imageUrls.rock} alt="Rock" />
        </div>
        <div 
          className={`choice-box ${playerChoice === 'paper' && showOutline === 'player' ? 'player-selected' : ''} ${computerChoice === 'paper' && showOutline === 'computer' ? 'computer-selected' : ''} ${playerChoice === 'paper' && computerChoice === 'paper' && showOutline === 'both' ? 'draw-selected' : ''}`}
          onClick={() => handleChoice('paper')}
        >
          <img src={imageUrls.paper} alt="Paper" />
        </div>
        <div 
          className={`choice-box ${playerChoice === 'scissors' && showOutline === 'player' ? 'player-selected' : ''} ${computerChoice === 'scissors' && showOutline === 'computer' ? 'computer-selected' : ''} ${playerChoice === 'scissors' && computerChoice === 'scissors' && showOutline === 'both' ? 'draw-selected' : ''}`}
          onClick={() => handleChoice('scissors')}
        >
          <img src={imageUrls.scissors} alt="Scissors" />
        </div>
      </div>

      {/* Outcome Display */}
      <div className="outcome">
        Outcome: {outcome && <span className="outcome-result">{outcome}</span>}
      </div>
    </div>
  );
};

export default RockPaperScissors;
