-- Create the triggers after creating the trigger functions

CREATE TRIGGER TransactOfferCleanupTrig_ai
AFTER INSERT ON transactions
FOR EACH ROW
EXECUTE PROCEDURE TransactOfferCleanupProc();