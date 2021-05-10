-- Create the triggers after creating the trigger functions

SET search_path TO p2p_books_schema;

DROP TRIGGER IF EXISTS TransactOfferCleanupTrig_ai ON p2p_books_schema.transactions;
DROP TRIGGER IF EXISTS UserReputationUpdateTrig_ai ON p2p_books_schema.transactions;

CREATE TRIGGER TransactOfferCleanupTrig_ai
AFTER INSERT ON transactions
FOR EACH ROW
EXECUTE PROCEDURE TransactOfferCleanupProc();

CREATE TRIGGER UserReputationUpdateTrig_ai
AFTER INSERT ON transactions
FOR EACH ROW
EXECUTE PROCEDURE UserReputationUpdateProc();