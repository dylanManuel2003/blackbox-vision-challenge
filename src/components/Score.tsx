import React from 'react';

interface ScoreProps {
  score: number;
}

const Score: React.FC<ScoreProps> = ({ score }) => {
  return (
    <div className="container">
      <h2>Game Over</h2>
      <p>Your score: {score}</p>
    </div>
  );
};

export default Score;
