-- Create the triggers after creating the trigger functions

DROP TRIGGER IF EXISTS TransactOfferCleanupTrig_ai ON transactions;
DROP TRIGGER IF EXISTS UserReputationUpdateTrig_ai ON transactions;

CREATE TRIGGER TransactOfferCleanupTrig_ai
AFTER INSERT ON transactions
FOR EACH ROW
EXECUTE PROCEDURE TransactOfferCleanupProc();

CREATE TRIGGER UserReputationUpdateTrig_ai
AFTER INSERT ON transactions
FOR EACH ROW
EXECUTE PROCEDURE UserReputationUpdateProc();