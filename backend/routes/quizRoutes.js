const express = require('express');
const router = express.Router();
const quizController = require('../controllers/quizController');

// Get all questions
router.get('/', quizController.getQuestions);

// Get a single question
router.get('/:id', quizController.getQuestion);

// Submit quiz answers
router.post('/submit', quizController.submitQuiz);

// Create a new question (admin only)
router.post('/', quizController.createQuestion);

module.exports = router;