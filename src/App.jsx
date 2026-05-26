import React, { useState } from 'react'
import Egg from './components/Egg'
import Reveal from './components/Reveal'
import Confetti from './components/Confetti'
import './App.css'

function App() {
  const [tapCount, setTapCount] = useState(0)
  const [gender] = useState(Math.random() > 0.5 ? 'boy' : 'girl')
  const [isRevealed, setIsRevealed] = useState(false)
  const maxTaps = 10

  const handleTap = () => {
    const newTapCount = tapCount + 1
    setTapCount(newTapCount)

    if (newTapCount >= maxTaps) {
      setTimeout(() => setIsRevealed(true), 500)
    }
  }

  const handleReset = () => {
    window.location.reload()
  }

  return (
    <div className="app">
      <div className="container">
        <h1>🎉 Gender Reveal 🎉</h1>
        <p className="instructions">Tap the egg to crack it open!</p>

        <div className="game-area">
          <Egg
            onTap={handleTap}
            tapCount={tapCount}
            maxTaps={maxTaps}
            isRevealed={isRevealed}
          />
        </div>

        <div className="tap-counter">
          Taps: <span>{tapCount}</span>/{maxTaps}
        </div>
      </div>

      <Reveal isVisible={isRevealed} gender={gender} onReset={handleReset} />
      <Confetti isActive={isRevealed} gender={gender} />
    </div>
  )
}

export default App
