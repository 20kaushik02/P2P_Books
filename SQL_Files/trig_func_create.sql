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
    RETURNS TRIGGER
    LANGUAGE plpgsql
    AS '
        DECLARE final_bai books_active.book_active_id%TYPE;
        DECLARE final_renter users.username%TYPE;
        DECLARE temp_doi offers.offer_id%TYPE;
    BEGIN
        SELECT book_active_id, renter INTO final_bai, final_renter FROM offers 
            WHERE offer_id = NEW.offer_id;
    
        FOR temp_doi IN (SELECT offer_id FROM offers 
            WHERE book_active_id = final_bai AND renter != final_renter) 
        LOOP
            DELETE FROM offers WHERE offer_id = temp_doi;
        END LOOP;
        RETURN NULL;
    END;
    ';

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
