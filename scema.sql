\connect readme;

CREATE TABLE users (
  username TEXT PRIMARY KEY,
  password TEXT NOT NULL,
  email TEXT NOT NULL,
  hours INTEGER NOT NULL
);

CREATE TABLE books (
  title TEXT PRIMARY KEY,
  pages INTEGER,
  username INTEGER
    REFERENCES users ON DELETE CASCADE
);

CREATE TABLE fav (
  username INTEGER
    REFERENCES users ON DELETE CASCADE,
  title INTEGER
    REFERENCES books ON DELETE CASCADE,
  PRIMARY KEY (username, title)
);

CREATE TABLE haveread (
  username INTEGER
    REFERENCES users ON DELETE CASCADE,
  title INTEGER
    REFERENCES books ON DELETE CASCADE,
  PRIMARY KEY (username, title)
);

CREATE TABLE notes (
  username INTEGER
    REFERENCES users ON DELETE CASCADE,
  title INTEGER
    REFERENCES books ON DELETE CASCADE,
  note TEXT,
  PRIMARY KEY (username, title)
);