import React from 'react';
import './Button.css';

const Button = ({ text, onClick }) => {
  return (
    <button className="app-button" onClick={onClick}>
      {text}
    </button>
  );
};

export default Button;
