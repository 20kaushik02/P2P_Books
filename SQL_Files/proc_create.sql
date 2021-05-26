CREATE OR REPLACE PROCEDURE RequestCleanProc()
AS $$
DECLARE temp_dri requests.request_id%TYPE;
DECLARE temp_dru requests.requester%TYPE;
DECLARE temp_b_title books.title%TYPE;
BEGIN
	FOR temp_dri IN (SELECT request_id FROM requests 
           WHERE expiry_date < CURRENT_DATE) 
    LOOP
		SELECT requester INTO temp_dru FROM requests 
			WHERE request_id = temp_dri;
		SELECT b.title INTO temp_b_title FROM books b
			INNER JOIN requests r ON r.books_id = b.books_id AND r.request_id = temp_dri;
           INSERT INTO notification (username, message)
		VALUES (temp_dru, 'Your request for "' ||temp_b_title|| '" has expired.');
           DELETE FROM requests WHERE request_id = temp_dri;
    END LOOP;
END;
$$ LANGUAGE plpgsql;