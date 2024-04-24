CREATE TABLE blogs (id SERIAL PRIMARY KEY, author TEXT, url TEXT NOT NULL, title TEXT NOT NULL, likes INTEGER DEFAULT 0);
INSERT INTO blogs (author, url, title) VALUES ('Me Myself', 'madeup.com', 'Best blog');
INSERT INTO blogs (url, title) VALUES ('somewhere.com', 'Unknown blog');
