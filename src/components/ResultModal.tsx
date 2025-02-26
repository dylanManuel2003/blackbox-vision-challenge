import React from 'react';

interface ResultModalProps {
  score: number;
  onPlayAgain: () => void;
  onShare: () => void;
}

const ResultModal: React.FC<ResultModalProps> = ({ score, onPlayAgain, onShare }) => {
  return (
    <div className="modal">
      <div className="modal-content">
        <h2>Juego Terminado</h2>
        <p>Tu puntaje final es: {score}</p>
        <button onClick={onPlayAgain}>Jugar de Nuevo</button>
        <button onClick={onShare}>Compartir</button>
      </div>
    </div>
  );
};

export default ResultModal;