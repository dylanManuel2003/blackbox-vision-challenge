import React, { useContext, useEffect } from "react";
import { SessionContext } from "../context/SessionContext";

interface ResultModalProps {
  onPlayAgain: () => void;
  onShare: () => void;
}

const ResultModal: React.FC<ResultModalProps> = ({ onPlayAgain, onShare }) => {
  const { username, score } = useContext(SessionContext)!;
  const shareMessage = `¡Acabo de jugar QuizBox Vision y obtuve ${score} puntos! Únete y juega conmigo: `;
  const gameUrl = window.location.href;
  const fullMessage = encodeURIComponent(shareMessage + gameUrl);

  const shareOnWhatsApp = () => {
    window.open(`https://wa.me/?text=${fullMessage}`);
  };

  const shareOnGmail = () => {
    window.open(`https://mail.google.com/mail/?view=cm&fs=1&to=&su=¡Juega QuizBox Vision conmigo!&body=${fullMessage}`);
  };

  const saveGameResult = async () => {
    try {
      const response = await fetch('https://blackbox-quizbox-api.onrender.com/api/games', {
      method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, score }),
      });
      if (response.ok) {
        console.log('Juego guardado exitosamente');
      } else {
        console.error('Error al guardar el juego');
      }
    } catch (error) {
      console.error('Error de red:', error);
    }
  };

  useEffect(() => {
    saveGameResult();
  }, []);

    return (
        <div className="modal">
          <div className="modal-content">
            <h2>Juego Terminado</h2>
            <p>Tu puntaje final es: {score}</p>
            <button onClick={onPlayAgain}>Jugar de Nuevo</button>
                <div className="share-buttons">
                  <button onClick={shareOnWhatsApp} className="share-whatsapp">
                    Compartir en WhatsApp
                  </button>
                  <button onClick={shareOnGmail} className="share-gmail">
                    Compartir en Gmail
                  </button>
                </div>
            </div>
            <div className="footer">
              <p>Desarrollado por Dylan Peralta</p>
              <a href="https://web-24.vercel.app/" target="_blank">
                Ver Portafolio
              </a>
            </div>
        </div>
  );
};

export default ResultModal;