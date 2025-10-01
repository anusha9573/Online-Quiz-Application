import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { useQuiz } from '../context/QuizContext';

const Container = styled.div`
  max-width: 800px;
  margin: 0 auto;
  padding: 20px;
`;

const Card = styled.div`
  background-color: #2d2d2d;
  border-radius: 8px;
  padding: 24px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  color: #fff;
`;

const Title = styled.h1`
  text-align: center;
  margin-bottom: 24px;
  color: #fff;
`;

const Score = styled.div`
  text-align: center;
  margin: 32px 0;
  
  h2 {
    font-size: 48px;
    color: #4CAF50;
    margin: 0;
  }
  
  p {
    font-size: 24px;
    color: #999;
    margin: 8px 0;
  }
`;

const Button = styled.button`
  background-color: #4CAF50;
  color: white;
  padding: 12px 24px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 16px;
  display: flex;
  align-items: center;
  gap: 8px;
  margin: 20px auto;
  
  &:hover {
    background-color: #45a049;
  }
`;

const QuestionList = styled.div`
  margin-top: 32px;
`;

const QuestionItem = styled.div`
  background-color: ${props => props.correct ? '#1b5e20' : '#b71c1c'};
  padding: 16px;
  border-radius: 4px;
  margin-bottom: 16px;
  
  h3 {
    margin: 0 0 12px 0;
    color: #fff;
  }
  
  p {
    margin: 8px 0;
    color: #ddd;
  }
  
  .correct-answer {
    background-color: rgba(76, 175, 80, 0.1);
    padding: 12px;
    border-radius: 4px;
    margin-top: 12px;
    border-left: 4px solid #4CAF50;
  }
`;

const ResultsPage = () => {
  const navigate = useNavigate();
  const { questions, answers, quizResults } = useQuiz();

  if (!quizResults) {
    return (
      <Container>
        <div style={{ textAlign: 'center', padding: '20px' }}>Loading...</div>
      </Container>
    );
  }

  const { score, results } = quizResults;
  const percentage = (score / questions.length) * 100;

  return (
    <Container>
      <motion.div
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <Card>
          <motion.div
            initial={{ scale: 0.8 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.2, duration: 0.5 }}
          >
            <Title>Quiz Results</Title>

            <Score>
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.5, duration: 0.5, type: "spring" }}
              >
                <h2>{score}/{questions.length}</h2>
                <p>{percentage.toFixed(1)}%</p>
                <p style={{ color: percentage >= 70 ? '#4CAF50' : '#ff9800' }}>
                  {percentage >= 70 ? "Great job! 🎉" : "Keep practicing! 💪"}
                </p>
              </motion.div>
            </Score>

            <QuestionList>
              {questions.map((question, index) => {
                const result = results.find(r => r.questionId === question.id);
                const answer = answers.find(a => a.questionId === question.id);
                
                return (
                  <motion.div
                    key={question.id}
                    initial={{ x: -20, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ delay: index * 0.1 }}
                  >
                    <QuestionItem correct={result?.correct}>
                      <h3>Question {index + 1}: {question.text}</h3>
                      <p>
                        Your answer: {question.options[answer?.selectedIndex]}
                        {result?.correct ? " ✅" : " ❌"}
                      </p>
                      {!result?.correct && (
                        <div className="correct-answer">
                          <p>Correct answer: {result.correctAnswer}</p>
                          <p style={{ fontStyle: 'italic', fontSize: '14px' }}>
                            Keep this in mind for next time!
                          </p>
                        </div>
                      )}
                    </QuestionItem>
                  </motion.div>
                );
              })}
            </QuestionList>

            <div style={{ textAlign: 'center' }}>
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Button onClick={() => navigate('/')}>
                  🔄 Take Another Quiz
                </Button>
              </motion.div>
            </div>
          </motion.div>
        </Card>
      </motion.div>
    </Container>
  );
};

export default ResultsPage;