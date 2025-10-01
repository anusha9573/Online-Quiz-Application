import { Route, Routes } from 'react-router-dom';
import styled from 'styled-components';
import QuizPage from './components/QuizPage';
import ResultsPage from './components/ResultsPage';
import StartPage from './components/StartPage';
import { ROUTES } from './constants';

const AppContainer = styled.div`
  min-height: 100vh;
  padding: 32px 0;
`;

const App = () => {
  return (
    <AppContainer>
      <Routes>
        <Route path={ROUTES.HOME} element={<StartPage />} />
        <Route path={ROUTES.QUIZ} element={<QuizPage />} />
        <Route path={ROUTES.RESULTS} element={<ResultsPage />} />
      </Routes>
    </AppContainer>
  );
};

export default App;