import React, { useState } from 'react';
import '../styles/Egg.css';

const Egg = ({ onTap, tapCount, maxTaps, isRevealed }) => {
  const [isWiggling, setIsWiggling] = useState(false);
  const [cracks, setCracks] = useState([]);

  // Zigzag cracks both vertical and horizontal, staying within egg bounds
  const crackPaths = [
    // Vertical zigzags
    'M 100 25 L 95 50 L 105 75 L 95 100 L 105 125 L 95 150 L 105 175 L 100 205',
    'M 100 25 L 105 50 L 95 75 L 105 100 L 95 125 L 105 150 L 95 175 L 100 205',
    // Horizontal zigzags
    'M 40 90 L 65 85 L 75 100 L 65 115 L 80 125 L 160 130',
    'M 40 130 L 70 125 L 80 140 L 70 155 L 85 165 L 160 170',
    // Diagonal zigzags top-left to bottom-right
    'M 50 45 L 70 65 L 65 90 L 80 110 L 75 135 L 90 160 L 85 185',
    'M 150 45 L 130 65 L 135 90 L 120 110 L 125 135 L 110 160 L 115 185',
    // Curved horizontal with zigzag
    'M 35 75 L 60 70 L 70 85 L 65 100 L 75 110 L 85 120 L 95 130 L 110 138 L 130 145 L 160 150',
    // Curved with vertical zigzag
    'M 60 35 L 75 55 L 70 75 L 85 95 L 80 115 L 95 135 L 90 160 L 100 190',
    // Middle zigzag going across
    'M 45 110 L 70 105 L 80 120 L 70 135 L 85 150 L 100 160 L 120 155 L 140 165 L 155 175',
    // Bottom diagonal zigzag
    'M 50 150 L 75 140 L 85 160 L 75 180 L 90 195 L 110 190 L 130 200',
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
