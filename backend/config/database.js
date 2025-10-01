const sqlite3 = require('sqlite3').verbose();
const path = require('path');

const dbPath = path.resolve(__dirname, '../database.sqlite');

const sampleQuestions = [
  {
    text: "What is the capital of France?",
    options: ["London", "Berlin", "Paris", "Madrid"],
    correctIndex: 2
  },
  {
    text: "Which planet is known as the Red Planet?",
    options: ["Venus", "Mars", "Jupiter", "Saturn"],
    correctIndex: 1
  },
  {
    text: "What is 2 + 2?",
    options: ["3", "4", "5", "6"],
    correctIndex: 1
  },
  {
    text: "Who painted the Mona Lisa?",
    options: ["Van Gogh", "Da Vinci", "Picasso", "Rembrandt"],
    correctIndex: 1
  }
];

const db = new sqlite3.Database(dbPath, (err) => {
  if (err) {
    console.error('Error connecting to database:', err);
    return;
  }
  console.log('Connected to SQLite database');

  // Create tables and insert sample data
  db.serialize(() => {
    // Questions table
    db.run(`
      CREATE TABLE IF NOT EXISTS questions (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        text TEXT NOT NULL,
        options TEXT NOT NULL,
        correctIndex INTEGER NOT NULL
      )
    `, (err) => {
      if (err) {
        console.error('Error creating questions table:', err);
        return;
      }

      // Check if questions table is empty
      db.get('SELECT COUNT(*) as count FROM questions', [], (err, row) => {
        if (err) {
          console.error('Error checking questions count:', err);
          return;
        }

        if (row.count === 0) {
          console.log('Inserting sample questions...');
          // Insert sample questions
          const stmt = db.prepare('INSERT INTO questions (text, options, correctIndex) VALUES (?, ?, ?)');
          
          sampleQuestions.forEach(question => {
            stmt.run(
              question.text,
              JSON.stringify(question.options),
              question.correctIndex,
              (err) => {
                if (err) {
                  console.error('Error inserting sample question:', err);
                }
              }
            );
          });
          
          stmt.finalize();
          console.log('Sample questions inserted successfully');
        }
      });
    });

    // Users table (optional)
    db.run(`
      CREATE TABLE IF NOT EXISTS users (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT NOT NULL,
        score INTEGER DEFAULT 0,
        answers TEXT
      )
    `, (err) => {
      if (err) {
        console.error('Error creating users table:', err);
      }
    });
  });
});

// Add error handler
db.on('error', (err) => {
  console.error('Database error:', err);
});

module.exports = db;