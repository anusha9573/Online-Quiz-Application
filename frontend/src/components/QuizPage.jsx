import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { useQuiz } from '../context/QuizContext';
import Timer from './Timer';

const Container = styled.div`
  max-width: 800px;
  margin: 0 auto;
  padding: 0 20px;
`;

const Card = styled.div`
  background-color: #2d2d2d;
  border-radius: 8px;
  padding: 32px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  margin-top: 32px;
`;

const ProgressText = styled.p`
  color: #999;
  margin-bottom: 8px;
`;

const ProgressBar = styled.div`
  width: 100%;
  height: 4px;
  background-color: #444;
  border-radius: 2px;
  margin-bottom: 24px;
  overflow: hidden;

  &:after {
    content: '';
    display: block;
    height: 100%;
    width: ${props => props.progress}%;
    background-color: #4CAF50;
    transition: width 0.3s ease;
  }
`;

const Question = styled.h2`
  color: #fff;
  margin-bottom: 24px;
  font-size: 24px;
`;

const OptionsGroup = styled.div`
  margin: 24px 0;
`;

const OptionLabel = styled.label`
  display: flex;
  align-items: center;
  padding: 12px;
  margin-bottom: 8px;
  background-color: #383838;
  border-radius: 4px;
  cursor: pointer;
  transition: background-color 0.2s;

  &:hover {
    background-color: #424242;
  }

  input {
    margin-right: 12px;
  }

  span {
    color: #fff;
  }
`;

const ButtonGroup = styled.div`
  display: flex;
  justify-content: space-between;
  margin-top: 32px;
`;

const Button = styled.button`
  padding: 12px 24px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 16px;
  transition: opacity 0.2s;

  ${props => props.variant === 'primary' && `
    background-color: #4CAF50;
    color: white;
    
    &:hover:not(:disabled) {
      background-color: #45a049;
    }
  `}

  ${props => props.variant === 'secondary' && `
    background-color: transparent;
    color: #4CAF50;
    border: 1px solid #4CAF50;
    
    &:hover:not(:disabled) {
      background-color: rgba(76, 175, 80, 0.1);
    }
  `}

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
`;

const QuizPage = () => {
  const navigate = useNavigate();
  const {
    questions,
    currentQuestionIndex,
    answers,
    setAnswers,
    loadQuestions,
    submitQuiz,
    setCurrentQuestionIndex
  } = useQuiz();

  useEffect(() => {
    loadQuestions();
  }, [loadQuestions]);

  const handleAnswerSelect = (event) => {
    const newAnswers = [...answers];
    newAnswers[currentQuestionIndex] = {
      questionId: questions[currentQuestionIndex].id,
      selectedIndex: parseInt(event.target.value)
    };
    setAnswers(newAnswers);
  };

  const handleNextQuestion = () => {
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    }
  };

  const handlePreviousQuestion = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(currentQuestionIndex - 1);
    }
  };

  const handleSubmit = async () => {
    await submitQuiz();
    navigate('/results');
  };

  const handleTimeUp = () => {
    handleSubmit();
  };

  if (!questions.length) {
    return (
      <Container>
        <div style={{ textAlign: 'center', padding: '20px' }}>Loading...</div>
      </Container>
    );
  }

  const currentQuestion = questions[currentQuestionIndex];
  const currentAnswer = answers[currentQuestionIndex];
  const progress = ((currentQuestionIndex + 1) / questions.length) * 100;

  return (
    <Container>
      <Timer duration={1800} onTimeUp={handleTimeUp} />
      
      <Card>
        <ProgressText>
          Question {currentQuestionIndex + 1} of {questions.length}
        </ProgressText>
        <ProgressBar progress={progress} />

        <Question>{currentQuestion.text}</Question>

        <OptionsGroup>
          {currentQuestion.options.map((option, index) => (
            <OptionLabel key={index}>
              <input
                type="radio"
                name="answer"
                value={index}
                checked={currentAnswer?.selectedIndex === index}
                onChange={handleAnswerSelect}
              />
              <span>{option}</span>
            </OptionLabel>
          ))}
        </OptionsGroup>

        <ButtonGroup>
          <Button
            variant="secondary"
            onClick={handlePreviousQuestion}
            disabled={currentQuestionIndex === 0}
          >
            Previous
          </Button>
          
          {currentQuestionIndex === questions.length - 1 ? (
            <Button
              variant="primary"
              onClick={handleSubmit}
              disabled={answers.some(answer => answer === undefined)}
            >
              Submit Quiz
            </Button>
          ) : (
            <Button
              variant="primary"
              onClick={handleNextQuestion}
              disabled={!currentAnswer}
            >
              Next
            </Button>
          )}
        </ButtonGroup>
      </Card>
    </Container>
  );
};

export default QuizPage;