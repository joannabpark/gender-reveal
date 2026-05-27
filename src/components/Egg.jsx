import React, { useState } from 'react';
import '../styles/Egg.css';

const Egg = ({ onTap, tapCount, maxTaps, isRevealed }) => {
  const [isWiggling, setIsWiggling] = useState(false);

  // Crack extends from left to right edge with zigzag
  // Starts small in center, expands to full width
  const createExpandingCrack = (expansion) => {
    // Calculate how much of the crack to show (0 to 1)
    const progress = Math.min(expansion / maxTaps, 1);
    
    // Start small in center, expand outward
    const leftStart = Math.max(30, 100 - progress * 70);
    const rightEnd = Math.min(170, 100 + progress * 70);
    
    // Create zigzag pattern that spans dynamically
    const segments = [];
    const startX = leftStart;
    const endX = rightEnd;
    const centerY = 120;
    const width = endX - startX;
    
    segments.push(`M ${startX} ${centerY}`);
    
    // Generate zigzag across the width
    const steps = Math.ceil(width / 10);
    for (let i = 1; i <= steps; i++) {
      const x = startX + (width / steps) * i;
      const offset = i % 2 === 0 ? 2 : -2;
      segments.push(`L ${x} ${centerY + offset}`);
    }
    
    return segments.join(' ');
  };

  const crackPath = createExpandingCrack(tapCount);
  const expansionPercentage = Math.min((tapCount / maxTaps) * 100, 100);

  const handleTap = (e) => {
    e.preventDefault();
    if (isRevealed || tapCount >= maxTaps) return;

    setIsWiggling(true);
    setTimeout(() => setIsWiggling(false), 300);

    onTap();
  };

  const eggOpacity = isRevealed ? 0.2 : 1;
  // Egg separation for opening effect
  const separationY = isRevealed ? 30 : 0;

  return (
    <div className="egg-container">
      <div
        className={`egg ${isWiggling ? 'wiggle' : ''} ${isRevealed ? 'opening' : ''}`}
        onPointerDown={handleTap}
        style={{ opacity: eggOpacity, pointerEvents: isRevealed ? 'none' : 'auto' }}
      >
        <svg className="egg-svg" viewBox="0 0 200 240" preserveAspectRatio="xMidYMid meet">
          <defs>
            <radialGradient id="eggGradient" cx="35%" cy="35%">
              <stop offset="0%" style={{ stopColor: '#d4a574', stopOpacity: 1 }} />
              <stop offset="50%" style={{ stopColor: '#8b6f47', stopOpacity: 1 }} />
              <stop offset="100%" style={{ stopColor: '#5a4a2f', stopOpacity: 1 }} />
            </radialGradient>
            <filter id="eggTexture">
              <feTurbulence type="fractalNoise" baseFrequency="0.8" numOctaves="4" result="noise" />
              <feDisplacementMap in="SourceGraphic" in2="noise" scale="1" />
            </filter>
          </defs>

          {/* Top half of egg - separates on reveal */}
          <g style={{ transform: `translateY(-${separationY}px)`, transition: 'transform 0.6s ease-out' }}>
            <path
              d="M 30 110 Q 30 40 100 30 Q 170 40 170 110 Z"
              fill="url(#eggGradient)"
              filter="url(#eggTexture)"
            />
            
            {/* Top speckles */}
            <circle cx="70" cy="60" r="3" fill="#6b5437" opacity="0.6" />
            <circle cx="130" cy="75" r="2.5" fill="#6b5437" opacity="0.5" />
            <circle cx="90" cy="100" r="2" fill="#6b5437" opacity="0.7" />
            <circle cx="140" cy="120" r="1.5" fill="#6b5437" opacity="0.3" />
            <circle cx="60" cy="95" r="2" fill="#6b5437" opacity="0.5" />
          </g>

          {/* Bottom half of egg - separates on reveal */}
          <g style={{ transform: `translateY(${separationY}px)`, transition: 'transform 0.6s ease-out' }}>
            <path
              d="M 30 110 Q 30 180 100 190 Q 170 180 170 110 Z"
              fill="url(#eggGradient)"
              filter="url(#eggTexture)"
            />
            
            {/* Bottom speckles */}
            <circle cx="110" cy="160" r="2" fill="#6b5437" opacity="0.5" />
            <circle cx="80" cy="180" r="2.5" fill="#6b5437" opacity="0.5" />
            <circle cx="130" cy="170" r="2" fill="#6b5437" opacity="0.6" />
            <circle cx="100" cy="155" r="1.5" fill="#6b5437" opacity="0.3" />
            <circle cx="125" cy="145" r="2" fill="#6b5437" opacity="0.4" />
          </g>

          {/* Highlight */}
          <ellipse cx="75" cy="75" rx="25" ry="35" fill="white" opacity="0.12" />

          {/* Expanding crack line */}
          {crackPath && (
            <>
              <path
                d={crackPath}
                className={`crack ${tapCount > 0 ? 'visible' : ''}`}
                strokeWidth="1.5"
              />
              <path
                d={crackPath}
                className={`crack-shadow ${tapCount > 0 ? 'visible' : ''}`}
                strokeWidth="0.8"
                strokeDashoffset="-2"
              />
            </>
          )}
        </svg>
      </div>
    </div>
  );
};

export default Egg;
