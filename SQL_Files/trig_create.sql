-- Create the triggers after creating the trigger functions

DROP TRIGGER IF EXISTS NewUserGreetTrig_ai ON users;
DROP TRIGGER IF EXISTS RequestFulfilMessageTrig_ai ON books_active;
DROP TRIGGER IF EXISTS OwnerOfferMessageTrig_ai ON offers;
DROP TRIGGER IF EXISTS TransactOfferCleanupTrig_ai ON transactions;
DROP TRIGGER IF EXISTS UserReputationUpdateTrig_ai ON transactions;

CREATE TRIGGER NewUserGreetTrig_ai
AFTER INSERT ON users
FOR EACH ROW
EXECUTE PROCEDURE NewUserGreetProc();

CREATE TRIGGER RequestFulfilMessageTrig_aiu
AFTER INSERT OR UPDATE ON books_active
FOR EACH ROW
EXECUTE PROCEDURE RequestFulfilMessageProc();

CREATE TRIGGER OwnerOfferMessageTrig_ai
AFTER INSERT ON offers
FOR EACH ROW
EXECUTE PROCEDURE OwnerOfferMessageProc();

CREATE TRIGGER TransactOfferCleanupTrig_ai
AFTER INSERT ON transactions
FOR EACH ROW
EXECUTE PROCEDURE TransactOfferCleanupProc();

CREATE TRIGGER UserReputationUpdateTrig_ai
AFTER INSERT ON transactions
FOR EACH ROW
EXECUTE PROCEDURE UserReputationUpdateProc();