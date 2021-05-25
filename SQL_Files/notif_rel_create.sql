CREATE SEQUENCE IF NOT EXISTS notif_pk_seq START 70000;

CREATE TABLE IF NOT EXISTS notification (
    notif_id INT NOT NULL DEFAULT nextval('notif_pk_seq'),
    username VARCHAR(255) NOT NULL,
    message VARCHAR(300) NOT NULL,
    message_date DATE NOT NULL DEFAULT CURRENT_DATE,
    PRIMARY KEY(notif_id),
    FOREIGN KEY (username) REFERENCES users(username)
);

-- Test insert into notification (username, message) values ('your user', 'Hello User');