import React, { useState } from 'react';
import { Question as QuestionType } from '../services/api';

interface QuestionProps {
  question: QuestionType;
  onAnswer: (isCorrect: boolean) => void;
}

const Question: React.FC<QuestionProps> = ({ question, onAnswer }) => {
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [isCorrect, setIsCorrect] = useState<boolean | null>(null);

  const handleAnswer = (answer: string) => {
    setSelectedAnswer(answer);
    const correct = answer === question.correct_answer;
    setIsCorrect(correct);
    onAnswer(correct);
  };

  const answers = [...question.incorrect_answers, question.correct_answer].sort();

  return (
    <div className="">
      <div className="question">
        <h2>{question.question}</h2>
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
      {selectedAnswer !== null && (
        <p className={`feedback ${isCorrect ? 'correct' : 'incorrect'}`}>
          {isCorrect ? 'Correct!' : 'Incorrect!'}
        </p>
      )}
    </div>
  );
};

export default Question;
