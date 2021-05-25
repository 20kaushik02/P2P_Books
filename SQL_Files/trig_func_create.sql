/* Triggers

1. Remove rejected offers once transaction is made
find the offer id of transaction, get the book active id and renter X (buyer) of that offer
find all offers with that book active id that have renter other than X
remove them

2. Update reputation of users after a transaction is made
find owner and renter from books_active and offers respectively
owner rep +3, renter rep -1

*/

CREATE OR REPLACE FUNCTION TransactOfferCleanupProc()
    RETURNS TRIGGER AS $TransactOfferCleanupTrig_ai$
    
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

            INSERT INTO notification(username,message) VALUES(user_name, 'Your offer for "' ||b_title|| '" was rejected');
            DELETE FROM offers WHERE offer_id = temp_doi;
        END LOOP;
        RETURN NULL;
    END;
    $TransactOfferCleanupTrig_ai$ LANGUAGE plpgsql;

CREATE OR REPLACE FUNCTION RequestFulfilMessage()
    RETURNS TRIGGER AS $RequestFulfilMessageTrig_ai$
    
        DECLARE requester_name requests.requester%TYPE;
        DECLARE temp_bid books.books_id%TYPE;
        DECLARE req_book books.title%TYPE;
    BEGIN
        
        FOR temp_bid, requester_name IN (SELECT books_id, requester FROM requests) LOOP
            IF (temp_bid = NEW.books_id) AND (NEW.book_status = 'A') THEN
                SELECT b.title INTO req_book FROM books b INNER JOIN books_active ba 
                ON b.books_id = ba.books_id AND ba.books_id = temp_bid;
                
                INSERT INTO notification(username,message) 
                VALUES(requester_name, 'Your request for "' ||req_book|| '" has been fulfilled. Head to the home page to make an offer');
            END IF;
        END LOOP;
        RETURN NULL;
    END;
    $RequestFulfilMessageTrig_ai$ LANGUAGE plpgsql;

CREATE OR REPLACE FUNCTION OwnerOfferMessage()
    RETURNS TRIGGER AS $OwnerOfferMessageTrig_ai$
    
        DECLARE owner_name books_active.owner%TYPE;
        DECLARE owner_book books.title%TYPE;
    BEGIN
        SELECT ba.owner, b.title INTO owner_name, owner_book FROM offers o INNER JOIN books_active ba
        ON o.book_active_id = ba.book_active_id AND o.book_active_id = NEW.book_active_id
        INNER JOIN books b ON ba.books_id = b.books_id;

        INSERT INTO notification(username,message) 
        VALUES(owner_name, 'New offer for your book,"' ||owner_book|| '"');
        RETURN NULL;
    END;
    $OwnerOfferMessageTrig_ai$ LANGUAGE plpgsql;

CREATE OR REPLACE FUNCTION UserReputationUpdateProc()
    RETURNS TRIGGER
    LANGUAGE plpgsql
    AS '
    BEGIN
        UPDATE users SET reputation = reputation + 3 WHERE username = 
            (SELECT owner FROM books_active WHERE book_active_id = 
                (SELECT book_active_id FROM offers WHERE offer_id = NEW.offer_id)
            );

        UPDATE users SET reputation = reputation - 1 WHERE username = 
                (SELECT renter FROM offers WHERE offer_id = NEW.offer_id);
        RETURN NULL;
    END;
    ';