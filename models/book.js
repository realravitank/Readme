const db = require('../db');
const ExpressError = require('../expressError');

class Book {

/** Register user with data. Returns new user data. */

  static async create(data) {
    const result = await db.query(
      `INSERT INTO books 
          (title, pages, username) 
        VALUES ($1, $2, $3) 
        RETURNING title, pages, username as "userName"`,
      [
        data.title,
        data.pages,
        data.userName
      ]
    );
    let book = result.rows[0];

    return book 
  }

 
  static async getAll(username) {
    const result = await db.query(
      `SELECT title,
                pages,
                username
            FROM books 
            WHERE username = $1`,
            [username]
    );
    return result.rows[0];
  }


  static async get(title) {
    const result = await db.query(
      `SELECT title,
                pages,
                username
         FROM books
         WHERE title = $1`,
      [title]
    );

    const book = result.rows[0];

    if (!book) {
      new ExpressError('No such book', 404);
    }

    return book;
  }


  static async delete(title) {
    const result = await db.query(
      'DELETE FROM books WHERE title = $1 RETURNING title',
      [title]
    );
    const book = result.rows[0];

    if (!book) {
      throw new ExpressError('No such book', 404);
    }

    return true;
  }
}

module.exports = Book;
