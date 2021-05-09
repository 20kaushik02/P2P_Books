/* Triggers

1. Remove rejected offers once transaction is made
find the offer id of transaction, get the book active id and rentee X (buyer) of that offer
find all offers with that book active id that have rentee other than X
remove them

2. Removal of request after expiry date
3. Update book status after it has been returned
4. 
*/

CREATE OR REPLACE FUNCTION TransactOfferCleanupProc()
    RETURNS TRIGGER
    SET SCHEMA 'public'
    LANGUAGE plpgsql
    SET search_path = public
    AS '
        DECLARE final_bai offers.book_active_id%TYPE;
        DECLARE final_rentee offers.rentee%TYPE;
        DECLARE temp_doi offers.offer_id%TYPE;
    BEGIN
        SELECT book_active_id, rentee INTO final_bai, final_rentee FROM offers 
            WHERE offer_id = NEW.offer_id;
    
        FOR temp_doi IN (SELECT offer_id FROM offers 
            WHERE book_active_id = final_bai AND rentee != final_rentee) LOOP
            DELETE FROM offers WHERE offer_id = temp_doi;
        END LOOP;
    END;
    ';