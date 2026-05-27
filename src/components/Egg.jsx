import React, { useState } from 'react';
import '../styles/Egg.css';

const Egg = ({ onTap, tapCount, maxTaps, isRevealed }) => {
  const [isWiggling, setIsWiggling] = useState(false);
  const [cracks, setCracks] = useState([]);

  // Mostly horizontal zigzags with some vertical for realistic hatching
  const crackPaths = [
    // Horizontal zigzags (majority)
    'M 40 70 L 65 65 L 75 80 L 65 95 L 80 110 L 70 125 L 85 140 L 95 150 L 110 155 L 135 160 L 155 165',
    'M 35 110 L 60 105 L 75 120 L 65 135 L 82 150 L 72 165 L 90 175 L 110 180 L 130 185 L 155 190',
    'M 45 150 L 70 145 L 85 160 L 75 175 L 92 190 L 110 200',
    'M 40 90 L 75 85 L 90 100 L 80 115 L 100 130 L 120 140 L 145 150 L 160 160',
    // Slightly angled horizontals
    'M 50 50 L 80 55 L 95 70 L 85 85 L 105 100 L 120 115 L 140 125 L 155 135',
    'M 45 180 L 75 175 L 90 190 L 100 200',
    // Vertical for structure
    'M 100 30 L 95 70 L 105 110 L 95 150 L 105 190',
    // Mixed diagonal-horizontal
    'M 50 130 L 85 125 L 105 145 L 95 165 L 120 180 L 140 190',
    // Wide horizontal spread
    'M 30 120 L 70 115 L 95 135 L 120 145 L 150 155 L 165 160',
    // Bottom horizontal
    'M 55 170 L 90 165 L 110 180 L 135 190 L 160 195',
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
