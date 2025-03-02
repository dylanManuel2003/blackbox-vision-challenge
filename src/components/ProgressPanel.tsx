import React, { useEffect, useContext, useState } from 'react';
import { SessionContext } from '../context/SessionContext';

interface Game {
  date: string;
  username: string;
  score: number;
}

const ProgressPanel: React.FC = () => {
  const { username, score } = useContext(SessionContext)!;
  const [gameHistory, setGameHistory] = useState<Game[]>([]);

  useEffect(() => {
    const fetchGameHistory = async () => {
      try {
        const response = await fetch('https://blackbox-quizbox-api.onrender.com/api/games');
        if (response.ok) {
          const data = await response.json();
          setGameHistory(data);
        } else {
          console.error('Error al obtener el historial de juegos');
        }
      } catch (error) {
        console.error('Error de red:', error);
      }
    };

    fetchGameHistory();
  }, []);

  return (
    <div className="progress-panel">
      <h2>Progreso del Juego</h2>
      <div className="session-info">
        <p><strong>Usuario:</strong> {username}</p>
        <p><strong>Puntaje:</strong> {score}</p>
      </div>
      <div className="game-history">
        <h3>Historial de Juegos</h3>
        <ul>
          {gameHistory.map((game, index) => (
            <li key={index}>
              {new Date(game.date).toLocaleString()} - {game.username}: {game.score} puntos
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default ProgressPanel;
