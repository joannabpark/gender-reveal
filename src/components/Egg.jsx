import React, { useState } from 'react';
import '../styles/Egg.css';

const Egg = ({ onTap, tapCount, maxTaps, isRevealed }) => {
  const [isWiggling, setIsWiggling] = useState(false);
  const [cracks, setCracks] = useState([]);

  const crackPaths = [
    'M 100 50 Q 120 80 100 120',
    'M 100 50 Q 80 80 100 120',
    'M 100 50 L 100 150',
    'M 80 100 L 120 140',
    'M 120 100 L 80 140',
    'M 100 60 Q 130 100 100 140',
    'M 100 60 Q 70 100 100 140',
    'M 60 80 L 140 80',
    'M 60 100 L 140 100',
    'M 60 120 L 140 120',
  ];

  const handleClick = () => {
    if (isRevealed || tapCount >= maxTaps) return;

    // Trigger wiggle
    setIsWiggling(true);
    setTimeout(() => setIsWiggling(false), 300);

    // Add new crack
    if (tapCount < crackPaths.length) {
      setCracks(prev => [...prev, { path: crackPaths[tapCount], index: tapCount }]);
    }

    onTap();
  };

  const eggOpacity = isRevealed ? 0.3 : 1;

  return (
    <div className="egg-container">
      <div
        className={`egg ${isWiggling ? 'wiggle' : ''}`}
        onClick={handleClick}
        onTouchStart={handleClick}
        style={{ opacity: eggOpacity, pointerEvents: isRevealed ? 'none' : 'auto' }}
      >
        <svg className="cracks" viewBox="0 0 200 240" preserveAspectRatio="none">
          {cracks.map((crack, idx) => (
            <path
              key={idx}
              d={crack.path}
              className="crack visible"
              style={{
                animationDelay: `${idx * 0.1}s`
              }}
            />
          ))}
        </svg>
      </div>
    </div>
  );
};

export default Egg;
