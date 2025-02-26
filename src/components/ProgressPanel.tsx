import React from 'react';

interface ProgressPanelProps {
  currentQuestionIndex: number;
  totalQuestions: number;
  score: number;
}

const ProgressPanel: React.FC<ProgressPanelProps> = ({ currentQuestionIndex, totalQuestions, score }) => {
  return (
    <div className="progress-panel">
      <div>Pregunta {currentQuestionIndex + 1} de {totalQuestions}</div>
      <div>Puntaje: {score}</div>
    </div>
  );
};

export default ProgressPanel;
