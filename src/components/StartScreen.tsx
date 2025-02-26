import React, { useState, KeyboardEvent } from 'react';

interface StartScreenProps {
  onStart: (username: string) => void;
}

const StartScreen: React.FC<StartScreenProps> = ({ onStart }) => {
  const [username, setUsername] = useState('');

  const handleStart = () => {
    if (username.trim()) {
      onStart(username);
    } else {
        alert('Por favor, ingresa un nombre de usuario.');
    }
  };

  const handleKeyPress = (event: KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {
      handleStart();
    }
  };

  return (
    <div className="container">
      <h1>¡Bienvenido a QuizBox Vision!</h1>
      <div className="container-text-start">
      <input
        type="text"
        placeholder="Ingresa tu nombre de usuario"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        onKeyPress={handleKeyPress}
        className="input-username"
      />
      <button onClick={handleStart} className="start-button">
        Comenzar Juego
      </button>
      </div>
    </div>
  );
};

export default StartScreen;
