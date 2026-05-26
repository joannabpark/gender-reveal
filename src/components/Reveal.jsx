import React from 'react';
import '../styles/Reveal.css';

const Reveal = ({ isVisible, gender, onReset }) => {
  if (!isVisible) return null;

  const isBoy = gender === 'boy';
  const emoji = isBoy ? '👦' : '👧';
  const text = isBoy ? 'BOY!' : 'GIRL!';
  const genderClass = isBoy ? 'boy' : 'girl';

  return (
    <div className="reveal show">
      <div className="reveal-content">
        <div className="gender-text">It's a...</div>
        <div className={`gender-reveal ${genderClass}`}>{emoji}</div>
        <div className={`gender-text ${genderClass}`}>{text}</div>
        <button className="reset-btn" onClick={onReset}>
          Play Again
        </button>
      </div>
    </div>
  );
};

export default Reveal;
