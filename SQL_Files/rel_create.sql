CREATE SEQUENCE IF NOT EXISTS location_pk_seq START 10000;
CREATE SEQUENCE IF NOT EXISTS books_pk_seq START 20000;
CREATE SEQUENCE IF NOT EXISTS books_act_pk_seq START 30000;
CREATE SEQUENCE IF NOT EXISTS offers_pk_seq START 40000;
CREATE SEQUENCE IF NOT EXISTS requests_pk_seq START 50000;
CREATE SEQUENCE IF NOT EXISTS transacs_pk_seq START 60000;

CREATE TABLE IF NOT EXISTS location (
    location_id INT NOT NULL DEFAULT nextval('location_pk_seq'),
    state VARCHAR(20) NOT NULL,
    city VARCHAR(20) NOT NULL,
    area VARCHAR(20) NOT NULL,
    street VARCHAR(20) NOT NULL,
    PRIMARY KEY (location_id)
);

CREATE TABLE IF NOT EXISTS users (
    username VARCHAR(25) NOT NULL,
    password VARCHAR(15) NOT NULL,
    name VARCHAR(25) NOT NULL,
    reputation FLOAT NOT NULL,
    phone VARCHAR(10) NOT NULL,
    mail VARCHAR(30) NOT NULL,
    DOB DATE NOT NULL,
    gender CHAR(1) NOT NULL CHECK (gender IN ('M', 'F', 'O')),
    location_id INT NOT NULL,
    PRIMARY KEY (username),
    FOREIGN KEY (location_id) REFERENCES location(location_id)
);

CREATE TABLE IF NOT EXISTS books (
    books_id INT NOT NULL DEFAULT nextval('books_pk_seq'),
    title VARCHAR(20) NOT NULL,
    author VARCHAR(20) NOT NULL,
    category VARCHAR(20) NOT NULL,
    PRIMARY KEY (books_id)
);

CREATE TABLE IF NOT EXISTS books_active (
    book_active_id INT NOT NULL DEFAULT nextval('books_act_pk_seq'),
    book_status CHAR(1) NOT NULL CHECK (book_status IN ('A', 'R', 'N')),
    books_id INT NOT NULL,
    renter VARCHAR NOT NULL,
    PRIMARY KEY (book_active_id),
    FOREIGN KEY (books_id) REFERENCES books(books_id),
    FOREIGN KEY (renter) REFERENCES users(username)
);

CREATE TABLE IF NOT EXISTS offers (
    offer_id INT NOT NULL DEFAULT nextval('offers_pk_seq'),
    book_active_id INT NOT NULL,
    rentee VARCHAR NOT NULL,
    PRIMARY KEY (offer_id),
    FOREIGN KEY (book_active_id) REFERENCES books_active(book_active_id),
    FOREIGN KEY (rentee) REFERENCES users(username)
);

CREATE TABLE IF NOT EXISTS requests (
    request_id INT NOT NULL DEFAULT nextval('requests_pk_seq'),
    request_date DATE NOT NULL,
    expiry_date DATE NOT NULL,
    books_id INT NOT NULL,
    requester VARCHAR NOT NULL,
    PRIMARY KEY (request_id),
    FOREIGN KEY (books_id) REFERENCES books(books_id),
    FOREIGN KEY (requester) REFERENCES users(username)
);

CREATE TABLE IF NOT EXISTS transactions (
    transaction_id INT NOT NULL DEFAULT nextval('transacs_pk_seq'),
    date_of_transac DATE NOT NULL,
    return_date DATE NOT NULL,
    offer_id INT NOT NULL,
    PRIMARY KEY (transaction_id),
    FOREIGN KEY (offer_id) REFERENCES offers(offer_id)
);
