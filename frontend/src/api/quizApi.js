import axios from 'axios';
import { API_BASE_URL, API_ENDPOINTS } from '../constants';

const quizApi = {
  // Get all questions
  getQuestions: async () => {
    try {
      const response = await axios.get(`${API_BASE_URL}${API_ENDPOINTS.QUESTIONS}`);
      return response.data;
    } catch (error) {
      throw new Error('Failed to fetch questions');
    }
  },

  // Get a single question
  getQuestion: async (id) => {
    try {
      const response = await axios.get(`${API_BASE_URL}${API_ENDPOINTS.QUESTION_BY_ID(id)}`);
      return response.data;
    } catch (error) {
      throw new Error('Failed to fetch question');
    }
  },

  // Submit quiz answers
  submitQuiz: async (answers, userId = null) => {
    try {
      const response = await axios.post(`${API_BASE_URL}${API_ENDPOINTS.SUBMIT_QUIZ}`, {
        answers,
        userId
      });
      return response.data;
    } catch (error) {
      throw new Error('Failed to submit quiz');
    }
  }
};

export default quizApi;