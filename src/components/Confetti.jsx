import React from 'react';
import '../styles/Confetti.css';

const Confetti = ({ isActive, gender }) => {
  const color = gender === 'boy' ? '#87CEEB' : '#FFB6C1';
  const confettiPieces = Array.from({ length: 30 }, (_, i) => i);

  if (!isActive) return null;

  return (
    <div className="confetti-container">
      {confettiPieces.map((i) => (
        <div
          key={i}
          className="confetti"
          style={{
            backgroundColor: color,
            left: Math.random() * 100 + '%',
            animationDuration: Math.random() * 2 + 2 + 's',
            animationDelay: Math.random() * 0.3 + 's',
          }}
        />
      ))}
    </div>
  );
};

export default Confetti;
