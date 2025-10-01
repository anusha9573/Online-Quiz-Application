const db = require('../config/database');

class User {
  static create(user) {
    return new Promise((resolve, reject) => {
      const { name } = user;
      db.run(
        'INSERT INTO users (name, score) VALUES (?, 0)',
        [name],
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

  static updateScore(userId, score, answers) {
    return new Promise((resolve, reject) => {
      db.run(
        'UPDATE users SET score = ?, answers = ? WHERE id = ?',
        [score, JSON.stringify(answers), userId],
        (err) => {
          if (err) {
            reject(err);
            return;
          }
          resolve();
        }
      );
    });
  }

  static getById(id) {
    return new Promise((resolve, reject) => {
      db.get('SELECT * FROM users WHERE id = ?', [id], (err, row) => {
        if (err) {
          reject(err);
          return;
        }
        if (row && row.answers) {
          row.answers = JSON.parse(row.answers);
        }
        resolve(row);
      });
    });
  }
}

module.exports = User;