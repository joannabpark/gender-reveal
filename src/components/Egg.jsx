import React, { useState } from 'react';
import '../styles/Egg.css';

const Egg = ({ onTap, tapCount, maxTaps, isRevealed }) => {
  const [isWiggling, setIsWiggling] = useState(false);
  const [cracks, setCracks] = useState([]);

  // True horizontal cracks with varied zigzag designs, staying within egg
  const crackPaths = [
    // Shallow wide zigzag (top)
    'M 45 65 L 75 63 L 85 68 L 105 66 L 125 70 L 145 68 L 155 70',
    // Medium zigzag (upper-middle)
    'M 40 95 L 65 93 L 75 98 L 90 96 L 110 100 L 130 98 L 150 102 L 160 100',
    // Tight zigzag (middle)
    'M 45 125 L 60 124 L 70 127 L 80 125 L 90 128 L 100 126 L 110 129 L 120 127 L 135 130 L 150 128 L 160 131',
    // Wide shallow zigzag (lower-middle)
    'M 40 155 L 75 152 L 95 157 L 120 154 L 145 158 L 160 156',
    // Small amplitude zigzag (lower)
    'M 50 180 L 70 179 L 85 181 L 100 180 L 115 182 L 130 181 L 150 183',
    // Diagonal-slight horizontal (top-right to bottom-left)
    'M 50 50 L 80 52 L 100 50 L 120 53 L 140 51 L 155 54',
    // Large amplitude zigzag (middle-left area)
    'M 45 110 L 65 107 L 80 115 L 100 110 L 120 118 L 140 112 L 155 120',
    // Fine zigzag pattern (dense)
    'M 55 140 L 68 139 L 75 141 L 85 140 L 95 142 L 105 141 L 115 143 L 125 142 L 135 144 L 148 143',
    // Wavy horizontal (top area)
    'M 40 75 L 70 73 L 90 77 L 110 74 L 135 78 L 155 75',
    // Bottom horizontal with zigzag
    'M 50 195 L 80 193 L 105 197 L 130 194 L 155 198',
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
