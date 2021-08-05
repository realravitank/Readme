const db = require('../db');
const ExpressError = require('../expressError');

class Note {

/** Register user with data. Returns new user data. */

  static async create(data) {
    const result = await db.query(
      `INSERT INTO notes 
          (username, title, note) 
        VALUES ($1, $2, $3) 
        RETURNING username, title, note`,
      [
        data.username,
        data.title,
        data.note
      ]
    );

    return result.rows[0];
  }

 
  static async getAll(username) {
    const result = await db.query(
      `SELECT username,
                title,
                note
            FROM notes 
            WHERE username = $1`,
            [username]
    );
    return result.rows[0];
  }


  static async get(title) {
    const result = await db.query(
      `SELECT username,
                title,
                note
         FROM notes
         WHERE title = $1`,
      [title]
    );


    return result.rows[0];
  }


  static async delete(note) {
    const result = await db.query(
      'DELETE FROM notes WHERE note = $1 RETURNING note',
      [note]
    );
    return true;
  }
}

module.exports = Note;
