const Question = require('../models/Question');
const User = require('../models/User');

class QuizController {
  constructor() {
    this.questionModel = Question.getInstance();
  }
  // Get all questions (without correct answers)
  async getQuestions(req, res) {
    try {
      const questions = await Question.getAll();
      if (!Array.isArray(questions)) {
        throw new Error('Invalid questions data format');
      }
      // Remove correctIndex from response for security
      const sanitizedQuestions = questions.map(({ id, text, options }) => ({
        id,
        text,
        options
      }));
      res.json(sanitizedQuestions);
    } catch (error) {
      console.error('Error in getQuestions:', error);
      res.status(500).json({ 
        error: 'Error fetching questions',
        message: process.env.NODE_ENV === 'development' ? error.message : undefined
      });
    }
  }

  // Get a single question by ID
  async getQuestion(req, res) {
    try {
      const question = await Question.getById(req.params.id);
      if (!question) {
        return res.status(404).json({ error: 'Question not found' });
      }
      res.json(question);
    } catch (error) {
      res.status(500).json({ error: 'Error fetching question' });
    }
  }

  // Submit quiz answers and get results
  async submitQuiz(req, res) {
    try {
      const { answers, userId } = req.body;
      
      if (!Array.isArray(answers)) {
        return res.status(400).json({ error: 'Invalid answers format' });
      }

      const results = await Question.checkAnswers(answers);

      // If userId is provided, update user's score
      if (userId) {
        await User.updateScore(userId, results.score, answers);
      }

      res.json(results);
    } catch (error) {
      res.status(500).json({ error: 'Error submitting quiz' });
    }
  }

  // Create a new question (admin only)
  async createQuestion(req, res) {
    try {
      const { text, options, correctIndex } = req.body;
      
      if (!text || !Array.isArray(options) || correctIndex === undefined) {
        return res.status(400).json({ error: 'Invalid question format' });
      }

      const questionId = await Question.create({ text, options, correctIndex });
      res.status(201).json({ id: questionId });
    } catch (error) {
      res.status(500).json({ error: 'Error creating question' });
    }
  }
}



module.exports = new QuizController();