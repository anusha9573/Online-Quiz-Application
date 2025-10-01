const db = require('C:/Users/addep/OneDrive/Desktop/vertex/online-quiz-app/backend/config/database.js');

const questions = [
  {
    text: "Which of the following is a popular generative AI model for text?",
    options: ["GPT", "ResNet", "YOLO", "BERT-Small"],
    correctIndex: 0
  },
  {
    text: "In pseudocode, what does `FOR i = 1 TO n` mean?",
    options: ["Loop n times", "Conditional check", "Function declaration", "Variable assignment"],
    correctIndex: 0
  },
  {
    text: "Which programming language is most commonly used for AI prototyping?",
    options: ["Python", "C++", "Java", "Go"],
    correctIndex: 0
  }
];

questions.forEach(q => {
  db.run(
    'INSERT INTO questions (text, options, correctIndex) VALUES (?, ?, ?)',
    [q.text, JSON.stringify(q.options), q.correctIndex],
    function(err) {
      if (err) console.error('Insert error:', err.message);
      else console.log('Inserted question ID:', this.lastID);
    }
  );
});
