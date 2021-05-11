DROP DATABASE IF EXISTS p2p_books;
CREATE DATABASE p2p_books;
\c p2p_books;
CREATE SCHEMA IF NOT EXISTS p2p_books_schema;
ALTER DATABASE p2pbooks SET search_path TO p2p_books_schema, public;
ALTER ROLE postgres SET search_path TO p2p_books_schema, public;