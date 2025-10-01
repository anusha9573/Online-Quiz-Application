// seedQuestions.js
const sqlite3 = require('sqlite3').verbose();
const path = require('path');

const dbPath = path.resolve(__dirname, '../database.sqlite');
const db = new sqlite3.Database(dbPath);

const questions = [
  {
    text: "What is the primary purpose of Generative AI?",
    options: [
      "Data storage",
      "Creating new content",
      "Sorting algorithms",
      "Network security"
    ],
    correctIndex: 1
  },
  {
    text: "Which language is commonly used for AI scripting?",
    options: ["Python", "HTML", "CSS", "SQL"],
    correctIndex: 0
  },
  {
    text: "What does 'token' refer to in NLP?",
    options: [
      "A word or subword unit",
      "A security key",
      "A type of database",
      "An AI model"
    ],
    correctIndex: 0
  },
  {
    text: "Which of these is a popular generative AI model?",
    options: ["GPT", "MySQL", "React", "Node.js"],
    correctIndex: 0
  },
  {
    text: "Which function in Python is used to generate random numbers?",
    options: ["rand()", "random()", "generate()", "randint()"],
    correctIndex: 3
  }
];

db.serialize(() => {
  const stmt = db.prepare('INSERT INTO questions (text, options, correctIndex) VALUES (?, ?, ?)');
  
  questions.forEach(q => {
    stmt.run(q.text, JSON.stringify(q.options), q.correctIndex);
  });

  stmt.finalize(() => {
    console.log('Sample questions inserted successfully!');
    db.close();
  });
});
