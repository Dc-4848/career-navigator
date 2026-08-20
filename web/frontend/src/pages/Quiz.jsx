import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppState } from '../store/AppContext';
import quizQuestions from '../data/quiz-questions';
import { calculateQuizResult } from '../ai/quiz-engine';
import './Quiz.css';

export default function Quiz() {
  const { state, dispatch } = useAppState();
  const navigate = useNavigate();

  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState([]);
  const [isFinished, setIsFinished] = useState(false);
  const [isAnalyzing, setIsAnalyzing] = useState(false);

  useEffect(() => {
    dispatch({ type: 'SET_STEP', payload: 2 }); // We'll say quiz is part of step 2 (exploration)
  }, [dispatch]);

  const handleAnswer = (option) => {
    const newAnswers = [...answers, option];
    setAnswers(newAnswers);

    if (currentQuestion < quizQuestions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      finishQuiz(newAnswers);
    }
  };

  const finishQuiz = (finalAnswers) => {
    setIsFinished(true);
    setIsAnalyzing(true);
    
    // Simulate AI thinking time
    setTimeout(() => {
      const result = calculateQuizResult(finalAnswers);
      dispatch({ type: 'SET_QUIZ_RESULT', payload: result });
      dispatch({ type: 'SET_DOMAIN', payload: result.domain });
      setIsAnalyzing(false);
    }, 2000);
  };

  const proceedToRoadmap = () => {
    navigate('/roadmap');
  };

  if (isAnalyzing) {
    return (
      <div className="quiz-container center-content">
        <div className="analyzer-box glass-panel">
          <div className="spinner"></div>
          <h2>Analyzing your profile...</h2>
          <p className="subtitle">Our AI is crunching the numbers to find your perfect tech match.</p>
        </div>
      </div>
    );
  }

  if (isFinished && state.quizResult) {
    const { domain, confidence, reason } = state.quizResult;
    return (
      <div className="quiz-container center-content">
        <div className="result-card glass-panel fade-in-up">
          <div className="result-header">
            <span className="result-icon">{domain.icon}</span>
            <h2>Your Best Match: <span style={{ color: `var(--${domain.color}-400)` }}>{domain.name}</span></h2>
          </div>
          
          <div className="confidence-meter">
            <div className="confidence-fill" style={{ width: `${confidence}%`, backgroundColor: `var(--${domain.color}-500)` }}></div>
          </div>
          <p className="confidence-text">{confidence}% Match Confidence</p>

          <div className="reason-box">
            <h3>Why this fits you:</h3>
            <p>{reason}</p>
          </div>

          <button className="primary-btn" onClick={proceedToRoadmap}>
            Generate My Roadmap
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M5 12h14M12 5l7 7-7 7" />
            </svg>
          </button>
        </div>
      </div>
    );
  }

  const question = quizQuestions[currentQuestion];

  return (
    <div className="quiz-container">
      <div className="quiz-header">
        <div className="progress-bar">
          <div 
            className="progress-fill" 
            style={{ width: `${((currentQuestion + 1) / quizQuestions.length) * 100}%` }}
          ></div>
        </div>
        <p>Question {currentQuestion + 1} of {quizQuestions.length}</p>
      </div>

      <div className="question-card glass-panel fade-in-up" key={currentQuestion}>
        <h2 className="question-text">{question.question}</h2>
        
        <div className="options-grid">
          {question.options.map((option, idx) => (
            <button 
              key={idx} 
              className="option-btn"
              onClick={() => handleAnswer(option)}
            >
              {option.text}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
