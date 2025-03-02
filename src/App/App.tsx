import React, { useEffect, useState, useContext } from 'react';
import { fetchQuestions, Question } from '../services/api';
import QuestionComponent from '../components/Question';
import ProgressPanel from '../components/ProgressPanel';
import ResultModal from '../components/ResultModal';
import StartScreen from '../components/StartScreen';
import { SessionContext } from '../context/SessionContext';
import { useHistory } from "react-router-dom";

const App: React.FC = () => {
  const { username, setUsername, score, setScore } = useContext(SessionContext)!;
  const [questions, setQuestions] = useState<Question[]>([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [gameOver, setGameOver] = useState(false);
  const history = useHistory();
  
  useEffect(() => {
    const loadQuestions = async () => {
      const questions = await fetchQuestions();
      setQuestions(questions);
    };

    loadQuestions();
  }, []);

  const handleAnswer = (isCorrect: boolean) => {
    const currentQuestion = questions[currentQuestionIndex];
    if (isCorrect) {
      setScore((prevScore: number) => prevScore + (currentQuestion.type === 'boolean' ? 5 : 10));
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
    setUsername('')
    history.push('/')
  };

  const handleShare = () => {
    alert('¡Comparte tu puntaje con tus amigos!');
  };

  const currentQuestion = questions[currentQuestionIndex];

  return (
    <div className="app-container">
    {!username ? (
      <StartScreen onStart={handleStartGame} />
    ) : gameOver ? (
      <ResultModal onPlayAgain={handlePlayAgain} onShare={handleShare} />
    ) : (
      <section className="container-game">
        <ProgressPanel />
        <div className="container-game-questions">
        {questions.length > 0 ? (
          <QuestionComponent
            question={questions[currentQuestionIndex]}
            onAnswer={handleAnswer}
            onNextQuestion={handleNextQuestion}
          />
        ) : (
          <div className="container">Loading...</div>
        )}
        </div>
      </section>
    )}
  </div>
  );
};

export default App;