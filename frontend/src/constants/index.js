// API Base URL
export const API_BASE_URL = process.env.REACT_APP_API_URL;

// API Endpoints
export const API_ENDPOINTS = {
  QUESTIONS: '/quiz',
  QUESTION_BY_ID: (id) => `/quiz/${id}`,
  SUBMIT_QUIZ: '/quiz/submit',
};

// Quiz Constants
export const QUIZ_CONSTANTS = {
  TIMER_DURATION: 1800, // 30 minutes in seconds
  MIN_PASS_PERCENTAGE: 60,
};

// Route Paths
export const ROUTES = {
  HOME: '/',
  QUIZ: '/quiz',
  RESULTS: '/results',
};