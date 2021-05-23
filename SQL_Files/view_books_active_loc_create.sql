CREATE OR REPLACE VIEW books_active_loc AS (
    SELECT ba.*,b.title,b.author,u.location_id,l.state,l.city,l.area,l.street FROM books_active ba 
    INNER JOIN books b ON ba.books_id = b.books_id 
    INNER JOIN users u on u.username = ba.owner 
    INNER JOIN location l ON l.location_id = u.location_id
);