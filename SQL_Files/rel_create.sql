CREATE SEQUENCE IF NOT EXISTS location_pk_seq START 10000;
CREATE SEQUENCE IF NOT EXISTS books_pk_seq START 20000;
CREATE SEQUENCE IF NOT EXISTS books_act_pk_seq START 30000;
CREATE SEQUENCE IF NOT EXISTS offers_pk_seq START 40000;
CREATE SEQUENCE IF NOT EXISTS requests_pk_seq START 50000;
CREATE SEQUENCE IF NOT EXISTS transacs_pk_seq START 60000;
CREATE SEQUENCE IF NOT EXISTS notif_pk_seq START 70000;

CREATE TABLE IF NOT EXISTS location (
    location_id INT NOT NULL DEFAULT nextval('location_pk_seq'),
    state VARCHAR(255) NOT NULL,
    city VARCHAR(255) NOT NULL,
    area VARCHAR(255) NOT NULL,
    street VARCHAR(255) NOT NULL,
    PRIMARY KEY (location_id)
);

CREATE TABLE IF NOT EXISTS users (
    username VARCHAR(255) NOT NULL,
    password VARCHAR(100) NOT NULL,
    name VARCHAR(255) NOT NULL,
    reputation NUMERIC(4,2) NOT NULL DEFAULT 10.00,
    phone VARCHAR(255) NOT NULL,
    mail VARCHAR(255) UNIQUE NOT NULL,
    DOB DATE NOT NULL,
    gender CHAR(1) NOT NULL CHECK (gender IN ('M', 'F', 'O')),
    location_id INT NOT NULL,
    PRIMARY KEY (username),
    FOREIGN KEY (location_id) REFERENCES location(location_id)
);

CREATE TABLE IF NOT EXISTS books (
    books_id INT NOT NULL DEFAULT nextval('books_pk_seq'),
    title VARCHAR(255) NOT NULL,
    author VARCHAR(255) NOT NULL,
    category VARCHAR(255) NOT NULL,
    PRIMARY KEY (books_id)
);

CREATE TABLE IF NOT EXISTS books_active (
    book_active_id INT NOT NULL DEFAULT nextval('books_act_pk_seq'),
    book_status CHAR(1) NOT NULL CHECK (book_status IN ('A', 'R', 'N')),
    books_id INT NOT NULL,
    owner VARCHAR(255) NOT NULL,
    PRIMARY KEY (book_active_id),
    FOREIGN KEY (books_id) REFERENCES books(books_id),
    FOREIGN KEY (owner) REFERENCES users(username)
);

CREATE TABLE IF NOT EXISTS offers (
    offer_id INT NOT NULL DEFAULT nextval('offers_pk_seq'),
    book_active_id INT NOT NULL,
    renter VARCHAR(255) NOT NULL,
    PRIMARY KEY (offer_id),
    FOREIGN KEY (book_active_id) REFERENCES books_active(book_active_id),
    FOREIGN KEY (renter) REFERENCES users(username)
);

CREATE TABLE IF NOT EXISTS requests (
    request_id INT NOT NULL DEFAULT nextval('requests_pk_seq'),
    request_date DATE NOT NULL,
    expiry_date DATE NOT NULL,
    books_id INT NOT NULL,
    requester VARCHAR(255) NOT NULL,
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

CREATE TABLE IF NOT EXISTS notification (
    notif_id INT NOT NULL DEFAULT nextval('notif_pk_seq'),
    username VARCHAR(255) NOT NULL,
    message VARCHAR(300) NOT NULL,
    message_date DATE NOT NULL DEFAULT CURRENT_DATE,
    PRIMARY KEY(notif_id),
    FOREIGN KEY (username) REFERENCES users(username)
);
