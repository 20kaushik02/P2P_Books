-- Create the triggers after creating the trigger functions

DROP TRIGGER IF EXISTS TransactOfferCleanupTrig_ai ON transactions;
DROP TRIGGER IF EXISTS UserReputationUpdateTrig_ai ON transactions;
DROP TRIGGER IF EXISTS RequestFulfilMessageTrig_ai ON books_active;
DROP TRIGGER IF EXISTS OwnerOfferMessageTrig_ai ON offers;

CREATE TRIGGER TransactOfferCleanupTrig_ai
AFTER INSERT ON transactions
FOR EACH ROW
EXECUTE PROCEDURE TransactOfferCleanupProc();

CREATE TRIGGER UserReputationUpdateTrig_ai
AFTER INSERT ON transactions
FOR EACH ROW
EXECUTE PROCEDURE UserReputationUpdateProc();

CREATE TRIGGER RequestFulfilMessageTrig_ai
AFTER INSERT OR UPDATE ON books_active
FOR EACH ROW
EXECUTE PROCEDURE RequestFulfilMessage();

CREATE TRIGGER OwnerOfferMessageTrig_ai
AFTER INSERT ON offers
FOR EACH ROW
EXECUTE PROCEDURE OwnerOfferMessage();