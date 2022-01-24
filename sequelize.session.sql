CREATE TABLE users(
  id serial PRIMARY KEY,
  first_name VARCHAR(64) NOT NULL,
  last_name VARCHAR(128) NOT NULL,
  email VARCHAR(255) NOT NULL  UNIQUE,
  password text NOT NULL,
  birthday DATE,
  is_male BOOLEAN,
  created_at TIMESTAMP NOT NULL,
  updated_at TIMESTAMP NOT NULL
);


CREATE TABLE users(
  id serial PRIMARY KEY,
  first_name VARCHAR(64)  NOT NULL,
  last_name VARCHAR(128) NOT NULL,
  email VARCHAR(255) NOT NULL UNIQUE,
  password text NOT NULL,
  birthday DATE,
  created_at TIMESTAMP NOT NULL,
  updated_at TIMESTAMP NOT NULL
);