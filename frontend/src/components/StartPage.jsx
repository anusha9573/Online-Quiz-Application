import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';

const Container = styled.div`
  max-width: 600px;
  margin: 0 auto;
  padding: 20px;
`;

const Card = styled.div`
  background-color: #2d2d2d;
  border-radius: 8px;
  padding: 32px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  margin-top: 64px;
  color: white;
`;

const Title = styled.h1`
  font-size: 32px;
  margin-bottom: 16px;
  color: #fff;
`;

const Description = styled.p`
  font-size: 16px;
  margin-bottom: 32px;
  color: #bbb;
  line-height: 1.6;
`;

const Button = styled.button`
  background-color: #4CAF50;
  color: white;
  padding: 16px 32px;
  border: none;
  border-radius: 4px;
  font-size: 18px;
  cursor: pointer;
  min-width: 200px;
  transition: background-color 0.2s;

  &:hover {
    background-color: #45a049;
  }
`;

const StartPage = () => {
  const navigate = useNavigate();

  return (
    <Container>
      <motion.div
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <Card>
          <Title>Welcome to the Quiz!</Title>
          
          <Description>
            Test your knowledge with our interactive quiz. You'll have 30 minutes to complete all questions.
          </Description>

          <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Button onClick={() => navigate('/quiz')}>
              Start Quiz
            </Button>
          </motion.div>
        </Card>
      </motion.div>
    </Container>
  );
};

export default StartPage;