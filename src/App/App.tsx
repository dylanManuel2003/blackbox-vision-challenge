import React, { useEffect, useState } from 'react';
import { fetchQuestions, Question } from '../services/api';
import QuestionComponent from '../components/Question';
import Score from '../components/Score';
import ProgressPanel from '../components/ProgressPanel';
import ResultModal from '../components/ResultModal';
import StartScreen from '../components/StartScreen';


const App: React.FC = () => {
  const [username, setUsername] = useState('');
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
  };

  const handleNextQuestion = () => {
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex((prevIndex) => prevIndex + 1);
    } else {
      setGameOver(true);
    }
  };

  const handleStartGame = (username: string) => {
    setUsername(username);
  };

  const handlePlayAgain = () => {
    setCurrentQuestionIndex(0);
    setScore(0);
    setGameOver(false);
  };

  const handleShare = () => {
    alert('¡Comparte tu puntaje con tus amigos!');
  };

  if (!username) {
    return <StartScreen onStart={handleStartGame} />;
  }

  if (gameOver) {
    return (
      <ResultModal score={score} onPlayAgain={handlePlayAgain} onShare={handleShare} />
    );
  }

  if (questions.length === 0) {
    return <div className="container">Loading...</div>;
  }

  const currentQuestion = questions[currentQuestionIndex];

  return (
    <div className="app-container">
      <ProgressPanel
        currentQuestionIndex={currentQuestionIndex}
        totalQuestions={questions.length}
        score={score}
      />
      <QuestionComponent
        question={currentQuestion}
        onAnswer={handleAnswer}
        onNextQuestion={handleNextQuestion}
      />
    </div>
  );
};

export default App;