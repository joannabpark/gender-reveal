import React, { useState } from 'react';
import '../styles/Egg.css';

const Egg = ({ onTap, tapCount, maxTaps, isRevealed }) => {
  const [isWiggling, setIsWiggling] = useState(false);
  const [cracks, setCracks] = useState([]);

  // More realistic crack paths that spread across the entire egg
  const crackPaths = [
    'M 100 30 Q 95 60 100 120 Q 102 150 100 200',
    'M 100 30 Q 105 65 100 120 Q 98 155 100 200',
    'M 60 80 Q 80 100 100 120 Q 110 135 140 160',
    'M 140 80 Q 120 100 100 120 Q 90 135 60 160',
    'M 80 50 L 110 180',
    'M 120 50 L 90 180',
    'M 50 120 Q 75 130 100 140 Q 120 145 150 150',
    'M 50 160 Q 75 165 100 170 Q 120 172 150 175',
    'M 100 60 Q 85 100 100 140 Q 115 175 100 210',
    'M 70 90 Q 90 110 110 130 Q 120 160 110 190',
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

          {/* Highlight for shine */}
          <ellipse cx="60" cy="60" rx="30" ry="40" fill="white" opacity="0.15" />

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
