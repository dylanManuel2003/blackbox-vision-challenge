import React, { useState } from 'react';

interface StartScreenProps {
  onStart: (username: string) => void;
}

const StartScreen: React.FC<StartScreenProps> = ({ onStart }) => {
  const [username, setUsername] = useState('');

  const handleStart = () => {
    if (username.trim()) {
      onStart(username);
    }
  };

  return (
    <div className="container">
      <h1>¡Bienvenido a QuizBox Vision!</h1>
      <input
        type="text"
        placeholder="Ingresa tu nombre de usuario"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        className="input-username"
      />
      <button onClick={handleStart} className="start-button">
        Comenzar Juego
      </button>
    </div>
  );
};

export default StartScreen;
