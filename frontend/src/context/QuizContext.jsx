import { createContext, useCallback, useContext, useState } from 'react';
import quizApi from '../api/quizApi';

const QuizContext = createContext(null);

export const useQuiz = () => {
  const context = useContext(QuizContext);
  if (!context) {
    throw new Error('useQuiz must be used within a QuizProvider');
  }
  return context;
};

export const QuizProvider = ({ children }) => {
  const [questions, setQuestions] = useState([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState([]);
  const [quizResults, setQuizResults] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const loadQuestions = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await quizApi.getQuestions();
      setQuestions(data);
      setAnswers(new Array(data.length));
      setCurrentQuestionIndex(0);
      setQuizResults(null);
    } catch (err) {
      setError('Failed to load questions');
      console.error('Error loading questions:', err);
    } finally {
      setLoading(false);
    }
  }, []);

  const submitQuiz = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const validAnswers = answers.filter(answer => answer !== undefined);
      const results = await quizApi.submitQuiz(validAnswers);
      setQuizResults(results);
      return results;
    } catch (err) {
      setError('Failed to submit quiz');
      console.error('Error submitting quiz:', err);
    } finally {
      setLoading(false);
    }
  }, [answers]);

  const resetQuiz = useCallback(() => {
    setQuestions([]);
    setCurrentQuestionIndex(0);
    setAnswers([]);
    setQuizResults(null);
    setError(null);
  }, []);

  const value = {
    questions,
    currentQuestionIndex,
    setCurrentQuestionIndex,
    answers,
    setAnswers,
    quizResults,
    error,
    loading,
    loadQuestions,
    submitQuiz,
    resetQuiz
  };

  return <QuizContext.Provider value={value}>{children}</QuizContext.Provider>;
};

export default QuizContext;