import React, { useEffect, useState } from 'react';
import { fetchQuestions, Question } from '../services/api';
import QuestionComponent from '../components/Question';
import Score from '../components/Score';

const App: React.FC = () => {
  const [questions, setQuestions] = useState<Question[]>([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [gameOver, setGameOver] = useState(false);

  useEffect(() => {
    const loadQuestions = async () => {
      const questions = await fetchQuestions();
      setQuestions(questions);
    };

    loadQuestions();
  }, []);

  const handleAnswer = (isCorrect: boolean) => {
    if (isCorrect) {
      setScore((prevScore) => prevScore + 10);
    }
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex((prevIndex) => prevIndex + 1);
    } else {
      setGameOver(true);
    }
  };

  if (gameOver) {
    return <Score score={score} />;
  }

  if (questions.length === 0) {
    return <div className="container">Loading...</div>;
  }

  const currentQuestion = questions[currentQuestionIndex];

  return (
    <div className="container">
      <QuestionComponent question={currentQuestion} onAnswer={handleAnswer} />
    </div>
  );
};

export default App;