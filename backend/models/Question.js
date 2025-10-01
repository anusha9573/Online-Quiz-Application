const db = require('../config/database');

class Question {
  constructor() {
    if (!Question.instance) {
      Question.instance = this;
    }
    return Question.instance;
  }

  static getInstance() {
    if (!Question.instance) {
      Question.instance = new Question();
    }
    return Question.instance;
  }

  static getAll() {
    return new Promise((resolve, reject) => {
      db.all('SELECT id, text, options FROM questions', [], (err, rows) => {
        if (err) {
          reject(new Error('Database error while fetching questions'));
          return;
        }
        try {
          // Parse options from JSON string with error handling
          const questions = rows.map(row => {
            try {
              return {
                ...row,
                options: JSON.parse(row.options)
              };
            } catch (parseErr) {
              console.error(`Error parsing options for question ${row.id}:`, parseErr);
              return {
                ...row,
                options: [] // Return empty array as fallback
              };
            }
          });
          resolve(questions);
        } catch (error) {
          reject(new Error('Error processing questions data'));
        }
      });
    });
  }

  static getById(id) {
    return new Promise((resolve, reject) => {
      db.get('SELECT id, text, options FROM questions WHERE id = ?', [id], (err, row) => {
        if (err) {
          reject(err);
          return;
        }
        if (!row) {
          resolve(null);
          return;
        }
        // Parse options from JSON string
        row.options = JSON.parse(row.options);
        resolve(row);
      });
    });
  }

  static create(question) {
    return new Promise((resolve, reject) => {
      const { text, options, correctIndex } = question;
      db.run(
        'INSERT INTO questions (text, options, correctIndex) VALUES (?, ?, ?)',
        [text, JSON.stringify(options), correctIndex],
        function(err) {
          if (err) {
            reject(err);
            return;
          }
          resolve(this.lastID);
        }
      );
    });
  }

  static checkAnswers(answers) {
    return new Promise((resolve, reject) => {
      const questionIds = answers.map(a => a.questionId).join(',');
      db.all(
        `SELECT id, correctIndex, options FROM questions WHERE id IN (${questionIds})`,
        [],
        (err, rows) => {
          if (err) {
            reject(err);
            return;
          }
          
          const results = answers.map(answer => {
            const question = rows.find(q => q.id === answer.questionId);
            if (!question) return {
              questionId: answer.questionId,
              correct: false
            };

            // Parse options for this question
            let options;
            try {
              options = JSON.parse(question.options);
            } catch (e) {
              options = [];
            }

            return {
              questionId: answer.questionId,
              correct: question.correctIndex === answer.selectedIndex,
              correctAnswer: options[question.correctIndex] // Include the correct answer text
            };
          });
          
          const score = results.filter(r => r.correct).length;
          resolve({ score, results });
        }
      );
    });
  }
}

module.exports = Question;
