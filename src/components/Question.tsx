import React, { useState, useEffect } from 'react';
import { Question as QuestionType } from '../services/api';
import { decodeHtmlEntity } from '../utils/htmlDecoder';

interface QuestionProps {
  question: QuestionType;
  onAnswer: (isCorrect: boolean) => void;
  onNextQuestion: () => void;
}

const Question: React.FC<QuestionProps> = ({ question, onAnswer, onNextQuestion }) => {
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [isCorrect, setIsCorrect] = useState<boolean | null>(null);
  const [showFeedback, setShowFeedback] = useState(false);

  useEffect(() => {
    setSelectedAnswer(null);
    setIsCorrect(null);
    setShowFeedback(false);
  }, [question]);

  const handleAnswer = (answer: string) => {
    setSelectedAnswer(answer);
    const correct = answer === question.correct_answer;
    setIsCorrect(correct);
    setShowFeedback(true);
    onAnswer(correct);
  };

  const handleNextQuestion = () => {
    setShowFeedback(false);
    onNextQuestion();
  };

  const decodedQuestion = decodeHtmlEntity(question.question);
  const answers = [...question.incorrect_answers, question.correct_answer].sort();

  return (
    <div className="">
      <div className="question">
        <h2>{decodedQuestion}</h2>
        <div className="question-meta">
          <div className="category">
            <i className="fas fa-folder"></i>
            {question.category}
          </div>
          <div className={`difficulty ${question.difficulty}`}>
            <i className="fas fa-signal"></i>
            {question.difficulty.charAt(0).toUpperCase() + question.difficulty.slice(1)}
          </div>
        </div>
      </div>
      <ul className="answers">
        {answers.map((answer, index) => (
          <li key={index}>
            <button onClick={() => handleAnswer(answer)} disabled={selectedAnswer !== null}>
              {answer}
            </button>
          </li>
        ))}
      </ul>
      {showFeedback && (
        <div className={`feedback ${isCorrect ? 'correct' : 'incorrect'}`}>
          <p>{isCorrect ? '¡Correcto!' : 'Incorrecto'}</p>
          <button onClick={handleNextQuestion}>Siguiente</button>
        </div>
      )}
    </div>
  );
};

export default Question;
