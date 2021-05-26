/* Trigger functions

1. Greet a new user
2. Alert requester if their requested book has been put in circulation
3. Alert book owner when an offer is made for their book
4. Remove rejected offers once transaction is made, alert all rejected offerers and the accepted offerer
5. Update reputation of owner and renter when a transaction is made

*/

CREATE OR REPLACE FUNCTION NewUserGreetProc()
    RETURNS TRIGGER AS $$
    BEGIN
        INSERT INTO notification (username, message)
        VALUES (NEW.username, 'Welcome to P2P Books! Share and borrow books for free!');
        RETURN NULL;
    END;
    $$ LANGUAGE plpgsql;

CREATE OR REPLACE FUNCTION RequestFulfilMessageProc()
    RETURNS TRIGGER AS $$
    
        DECLARE requester_name requests.requester%TYPE;
        DECLARE temp_bid books.books_id%TYPE;
        DECLARE req_book books.title%TYPE;
    BEGIN
        
        FOR temp_bid, requester_name IN (SELECT books_id, requester FROM requests) LOOP
            IF (temp_bid = NEW.books_id) AND (NEW.book_status = 'A') THEN
                SELECT b.title INTO req_book FROM books b INNER JOIN books_active ba 
                ON b.books_id = ba.books_id AND ba.books_id = temp_bid;
                
                INSERT INTO notification (username, message) 
                VALUES(requester_name, 'Your request for "' ||req_book|| '" has been fulfilled. Head to the home page to make an offer.');
            END IF;
        END LOOP;
        RETURN NULL;
    END;
    $$ LANGUAGE plpgsql;

CREATE OR REPLACE FUNCTION OwnerOfferMessageProc()
    RETURNS TRIGGER AS $$
    
        DECLARE owner_name books_active.owner%TYPE;
        DECLARE owner_book books.title%TYPE;
    BEGIN
        SELECT ba.owner, b.title INTO owner_name, owner_book FROM offers o INNER JOIN books_active ba
        ON o.book_active_id = ba.book_active_id AND o.book_active_id = NEW.book_active_id
        INNER JOIN books b ON ba.books_id = b.books_id;

        INSERT INTO notification (username, message) 
        VALUES(owner_name, 'New offer for your book, "' ||owner_book|| '"');
        RETURN NULL;
    END;
    $$ LANGUAGE plpgsql;

CREATE OR REPLACE FUNCTION TransactOfferCleanupProc()
    RETURNS TRIGGER AS $$
    
        DECLARE final_bai books_active.book_active_id%TYPE;
        DECLARE final_renter users.username%TYPE;
        DECLARE temp_doi offers.offer_id%TYPE;
        DECLARE user_name offers.renter%TYPE;
        DECLARE b_title books.title%TYPE;

    BEGIN
        SELECT book_active_id, renter INTO final_bai, final_renter FROM offers 
            WHERE offer_id = NEW.offer_id;

        SELECT b.title INTO b_title FROM books b INNER JOIN books_active ba ON 
            ba.books_id = b.books_id AND ba.book_active_id = final_bai;

        FOR temp_doi IN (SELECT offer_id FROM offers 
            WHERE book_active_id = final_bai AND renter != final_renter) 
        LOOP
            SELECT renter INTO user_name FROM offers
                WHERE offer_id = temp_doi;
            INSERT INTO notification (username, message) VALUES (user_name, 'Your offer for "' ||b_title|| '" was rejected.');
            DELETE FROM offers WHERE offer_id = temp_doi;
        END LOOP;

        INSERT INTO notification (username, message) VALUES (final_renter, 'Your offer for "' ||b_title|| '" was accepted.');
        RETURN NULL;
    END;
    $$ LANGUAGE plpgsql;

CREATE OR REPLACE FUNCTION UserReputationUpdateProc()
    RETURNS TRIGGER AS $$
    BEGIN
        UPDATE users SET reputation = reputation + 2 WHERE username = 
            (SELECT owner FROM books_active WHERE book_active_id = 
                (SELECT book_active_id FROM offers WHERE offer_id = NEW.offer_id)
            );

        UPDATE users SET reputation = reputation - 1 WHERE username = 
                (SELECT renter FROM offers WHERE offer_id = NEW.offer_id);
        RETURN NULL;
    END;
    $$ LANGUAGE plpgsql;