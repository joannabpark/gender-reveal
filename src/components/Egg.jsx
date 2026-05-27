import React, { useState } from 'react';
import '../styles/Egg.css';

const Egg = ({ onTap, tapCount, maxTaps, isRevealed }) => {
  const [isWiggling, setIsWiggling] = useState(false);
  const [cracks, setCracks] = useState([]);

  // More realistic zigzag crack paths that spread across entire egg
  const crackPaths = [
    'M 100 20 L 95 50 L 105 80 L 95 110 L 100 140 L 90 170 L 100 220',
    'M 100 20 L 105 50 L 95 80 L 105 110 L 100 140 L 110 170 L 100 220',
    'M 50 40 L 75 70 L 60 100 L 80 130 L 70 160 L 85 190',
    'M 150 40 L 125 70 L 140 100 L 120 130 L 130 160 L 115 190',
    'M 70 30 L 85 60 L 75 90 L 95 120 L 85 150 L 100 180 L 95 210',
    'M 130 30 L 115 60 L 125 90 L 105 120 L 115 150 L 100 180 L 105 210',
    'M 40 80 L 65 95 L 55 125 L 75 145 L 65 175',
    'M 160 80 L 135 95 L 145 125 L 125 145 L 135 175',
    'M 100 40 L 110 75 L 95 110 L 110 145 L 95 180 L 105 215',
    'M 80 50 L 100 85 L 85 120 L 105 160 L 90 190 L 110 220',
  ];

  const handleTap = (e) => {
    e.preventDefault();
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
        onPointerDown={handleTap}
        style={{ opacity: eggOpacity, pointerEvents: isRevealed ? 'none' : 'auto' }}
      >
        <svg className="egg-svg" viewBox="0 0 200 240" preserveAspectRatio="xMidYMid meet">
          {/* Egg shell with gradient and texture */}
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

          {/* Main egg shape */}
          <ellipse
            cx="100"
            cy="110"
            rx="70"
            ry="90"
            fill="url(#eggGradient)"
            filter="url(#eggTexture)"
          />

          {/* Speckles for realistic texture */}
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

          {/* Highlight for shine - positioned inside egg */}
          <ellipse cx="75" cy="75" rx="25" ry="35" fill="white" opacity="0.12" />

          {/* Cracks container */}
          <g className="cracks">
            {cracks.map((crack, idx) => (
              <g key={idx}>
                {/* Main crack line */}
                <path
                  d={crack.path}
                  className="crack visible"
                  style={{
                    animationDelay: `${idx * 0.1}s`
                  }}
                />
                {/* Secondary branching cracks for realism */}
                <path
                  d={crack.path}
                  className="crack-shadow visible"
                  style={{
                    animationDelay: `${idx * 0.1 + 0.05}s`
                  }}
                  strokeDashoffset="-2"
                />
              </g>
            ))}
          </g>
        </svg>
      </div>
    </div>
  );
};

export default Egg;
