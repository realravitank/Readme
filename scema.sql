DROP DATABASE IF EXISTS readme;

CREATE DATABASE readme;


\connect readme;

DROP TABLE IF EXISTS users;

CREATE TABLE users (
  username TEXT PRIMARY KEY,
  password TEXT NOT NULL,
  email TEXT NOT NULL,
  hours INTEGER NOT NULL
);

DROP TABLE IF EXISTS books;


CREATE TABLE books (
  title TEXT PRIMARY KEY,
  pages INTEGER,
  username TEXT
    REFERENCES users ON DELETE CASCADE
);

DROP TABLE IF EXISTS favs;


CREATE TABLE favs (
  username TEXT
    REFERENCES users ON DELETE CASCADE,
  title TEXT
    REFERENCES books ON DELETE CASCADE,
  PRIMARY KEY (username, title)
);

DROP TABLE IF EXISTS havereads;


CREATE TABLE havereads (
  username TEXT
    REFERENCES users ON DELETE CASCADE,
  title TEXT
    REFERENCES books ON DELETE CASCADE,
  PRIMARY KEY (username, title)
);

DROP TABLE IF EXISTS notes;


CREATE TABLE notes (
  username TEXT
    REFERENCES users ON DELETE CASCADE,
  title TEXT
    REFERENCES books ON DELETE CASCADE,
  note TEXT,
  PRIMARY KEY (username, title)
);