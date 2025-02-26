import React from "react";

interface ResultModalProps {
  score: number;
  onPlayAgain: () => void;
  onShare: () => void;
}

const ResultModal: React.FC<ResultModalProps> = ({ score, onPlayAgain, onShare }) => {
  const shareMessage = `¡Acabo de jugar QuizBox Vision y obtuve ${score} puntos! Únete y juega conmigo: `;
  const gameUrl = window.location.href;
  const fullMessage = encodeURIComponent(shareMessage + gameUrl);

  const shareOnWhatsApp = () => {
    window.open(`https://wa.me/?text=${fullMessage}`);
  };

  const shareOnGmail = () => {
    window.open(`https://mail.google.com/mail/?view=cm&fs=1&to=&su=¡Juega QuizBox Vision conmigo!&body=${fullMessage}`);
  };

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