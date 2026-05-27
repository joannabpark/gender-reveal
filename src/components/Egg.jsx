import React, { useState } from 'react';
import '../styles/Egg.css';

const Egg = ({ onTap, tapCount, maxTaps, isRevealed }) => {
  const [isWiggling, setIsWiggling] = useState(false);

  const createExpandingCrack = (expansion) => {
    const progress = Math.min(expansion / maxTaps, 1);
    const leftStart = Math.max(30, 100 - progress * 70);
    const rightEnd = Math.min(170, 100 + progress * 70);
    
    const segments = [];
    const startX = leftStart;
    const endX = rightEnd;
    const centerY = 120;
    const width = endX - startX;
    
    segments.push(`M ${startX} ${centerY}`);
    const steps = Math.ceil(width / 10);
    for (let i = 1; i <= steps; i++) {
      const x = startX + (width / steps) * i;
      const offset = i % 2 === 0 ? 2 : -2;
      segments.push(`L ${x} ${centerY + offset}`);
    }
    
    return segments.join(' ');
  };

  const crackPath = createExpandingCrack(tapCount);

  const handleTap = (e) => {
    e.preventDefault();
    if (isRevealed || tapCount >= maxTaps) return;

    setIsWiggling(true);
    setTimeout(() => setIsWiggling(false), 300);

    onTap();
  };

  const eggOpacity = isRevealed ? 0.2 : 1;
  const separationY = isRevealed ? 35 : 0;

  return (
    <div className="egg-container">
      <div
        className={`egg ${isWiggling ? 'wiggle' : ''} ${isRevealed ? 'opening' : ''}`}
        onPointerDown={handleTap}
        style={{ opacity: eggOpacity, pointerEvents: isRevealed ? 'none' : 'auto' }}
      >
        <svg className="egg-svg" viewBox="0 0 200 240" preserveAspectRatio="xMidYMid meet">
          <defs>
            {/* Better brown gradient for realistic egg */}
            <radialGradient id="eggGradient" cx="35%" cy="30%">
              <stop offset="0%" style={{ stopColor: '#c9a876', stopOpacity: 1 }} />
              <stop offset="40%" style={{ stopColor: '#a8845c', stopOpacity: 1 }} />
              <stop offset="100%" style={{ stopColor: '#7d5f3a', stopOpacity: 1 }} />
            </radialGradient>
            <filter id="eggTexture">
              <feTurbulence type="fractalNoise" baseFrequency="0.8" numOctaves="4" result="noise" />
              <feDisplacementMap in="SourceGraphic" in2="noise" scale="0.8" />
            </filter>
          </defs>

          {/* Top half - proper egg shape (rounder) */}
          <g style={{ transform: `translateY(-${separationY}px)`, transition: 'transform 0.6s ease-out' }}>
            <path
              d="M 100 20 Q 60 25 50 65 Q 45 85 50 110 L 150 110 Q 155 85 150 65 Q 140 25 100 20 Z"
              fill="url(#eggGradient)"
              filter="url(#eggTexture)"
            />
            
            {/* Top speckles */}
            <circle cx="75" cy="50" r="2.5" fill="#6b5437" opacity="0.5" />
            <circle cx="125" cy="60" r="2" fill="#6b5437" opacity="0.4" />
            <circle cx="90" cy="80" r="2" fill="#6b5437" opacity="0.6" />
            <circle cx="135" cy="95" r="1.5" fill="#6b5437" opacity="0.3" />
            <circle cx="70" cy="100" r="1.5" fill="#6b5437" opacity="0.4" />
          </g>

          {/* Bottom half - pointed egg shape */}
          <g style={{ transform: `translateY(${separationY}px)`, transition: 'transform 0.6s ease-out' }}>
            <path
              d="M 50 110 Q 45 135 50 165 Q 60 200 100 210 Q 140 200 150 165 Q 155 135 150 110 Z"
              fill="url(#eggGradient)"
              filter="url(#eggTexture)"
            />
            
            {/* Bottom speckles */}
            <circle cx="80" cy="140" r="2" fill="#6b5437" opacity="0.5" />
            <circle cx="120" cy="155" r="2" fill="#6b5437" opacity="0.4" />
            <circle cx="100" cy="175" r="1.5" fill="#6b5437" opacity="0.5" />
            <circle cx="135" cy="135" r="1.5" fill="#6b5437" opacity="0.3" />
            <circle cx="70" cy="160" r="1.5" fill="#6b5437" opacity="0.4" />
          </g>

          {/* Shine highlight */}
          <ellipse cx="70" cy="60" rx="20" ry="30" fill="white" opacity="0.1" />

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
