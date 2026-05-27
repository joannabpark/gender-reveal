import React, { useState } from 'react';
import '../styles/Egg.css';

const Egg = ({ onTap, tapCount, maxTaps, isRevealed }) => {
  const [isWiggling, setIsWiggling] = useState(false);

  // Single expanding zigzag crack pattern
  const mainCrackPath = 'M 70 120 L 75 119 L 80 121 L 85 120 L 90 122 L 95 121 L 100 123 L 105 122 L 110 124 L 115 123 L 120 125 L 125 124 L 130 126';

  // Calculate expansion based on tap count (0-100%)
  const expansionPercentage = Math.min((tapCount / maxTaps) * 100, 100);

  const handleTap = (e) => {
    e.preventDefault();
    if (isRevealed || tapCount >= maxTaps) return;

    setIsWiggling(true);
    setTimeout(() => setIsWiggling(false), 300);

    onTap();
  };

  const eggOpacity = isRevealed ? 0.3 : 1;

  return (
    <div className="egg-container">
      <div
        className={`egg ${isWiggling ? 'wiggle' : ''}`}
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
            {/* Clipping path for expanding crack */}
            <clipPath id="crackClip">
              <rect x={`${50 - expansionPercentage * 0.25}`} y="0" width={`${100 + expansionPercentage * 0.5}`} height="240" />
            </clipPath>
          </defs>

          {/* Main egg shape */}
          <ellipse
            cx="100"
            cy="110"
            rx="70"
            ry="90"
            fill="url(#eggGradient)"
            filter="url(#eggTexture)"
          />

          {/* Speckles */}
          <circle cx="70" cy="60" r="3" fill="#6b5437" opacity="0.6" />
          <circle cx="130" cy="75" r="2.5" fill="#6b5437" opacity="0.5" />
          <circle cx="90" cy="100" r="2" fill="#6b5437" opacity="0.7" />
          <circle cx="140" cy="120" r="3" fill="#6b5437" opacity="0.4" />
          <circle cx="60" cy="140" r="2.5" fill="#6b5437" opacity="0.6" />
          <circle cx="110" cy="160" r="2" fill="#6b5437" opacity="0.5" />
          <circle cx="80" cy="180" r="2.5" fill="#6b5437" opacity="0.5" />
          <circle cx="130" cy="170" r="2" fill="#6b5437" opacity="0.6" />
          <circle cx="100" cy="80" r="1.5" fill="#6b5437" opacity="0.4" />
          <circle cx="75" cy="120" r="2" fill="#6b5437" opacity="0.5" />
          <circle cx="125" cy="145" r="2.5" fill="#6b5437" opacity="0.4" />

          {/* Highlight */}
          <ellipse cx="75" cy="75" rx="25" ry="35" fill="white" opacity="0.12" />

          {/* Expanding crack - clipped to expand from center */}
          <g clipPath="url(#crackClip)">
            {/* Main crack line */}
            <path
              d={mainCrackPath}
              className={`crack expanding ${tapCount > 0 ? 'visible' : ''}`}
            />
            {/* Crack shadow for depth */}
            <path
              d={mainCrackPath}
              className={`crack-shadow expanding ${tapCount > 0 ? 'visible' : ''}`}
              strokeDashoffset="-2"
            />
          </g>
        </svg>
      </div>
    </div>
  );
};

export default Egg;
