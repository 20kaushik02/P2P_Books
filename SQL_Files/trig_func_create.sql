/* Triggers

1. Remove rejected offers once transaction is made
find the offer id of transaction, get the book active id and renter X (buyer) of that offer
find all offers with that book active id that have renter other than X
remove them

2. Update reputation of user after a transaction is made as well after it is completed
find 

*/

CREATE OR REPLACE FUNCTION TransactOfferCleanupProc()
    RETURNS TRIGGER
    SET SCHEMA 'public'
    LANGUAGE plpgsql
    SET search_path = public
    AS '
        DECLARE final_bai offers.book_active_id%TYPE;
        DECLARE final_renter offers.renter%TYPE;
        DECLARE temp_doi offers.offer_id%TYPE;
    BEGIN
        SELECT book_active_id, renter INTO final_bai, final_renter FROM offers 
            WHERE offer_id = NEW.offer_id;
    
        FOR temp_doi IN (SELECT offer_id FROM offers 
            WHERE book_active_id = final_bai AND renter != final_renter) 
        LOOP
            DELETE FROM offers WHERE offer_id = temp_doi;
        END LOOP;
    END;
    ';
/*
CREATE OR REPLACE FUNCTION ReputationCalc()
    RETURNS TRIGGER
    SET SCHEMA 'public'
    LANGUAGE plpgsql
    SET search_path = public
    AS '
        DECLARE;
    BEGIN
        UPDATE users
            SET do the rep calc part here for seller
                WHERE username = (SELECT username FROM users WHERE )
    ';
*/