-- INSERT entry --
CREATE OR REPLACE FUNCTION update_totalstock_after_insertentry() RETURNS TRIGGER AS
$BODY$
BEGIN
	UPDATE product
	SET total_stock = total_stock + NEW.quantity
	WHERE id = NEW.product_id;
	RETURN NEW;
END;
$BODY$
language plpgsql;

CREATE TRIGGER update_totalstock_after_insertentry
AFTER INSERT ON entry
FOR EACH ROW
EXECUTE PROCEDURE update_totalstock_after_insertentry();

-- INSERT exit --
CREATE OR REPLACE FUNCTION update_totalstock_after_insertexit() RETURNS TRIGGER AS
$BODY$
BEGIN
	UPDATE product
	SET total_stock = total_stock - NEW.quantity
	WHERE id = NEW.product_id;
	RETURN NEW;
END;
$BODY$
language plpgsql;

CREATE TRIGGER update_totalstock_after_deleteexit
AFTER INSERT ON exit
FOR EACH ROW
EXECUTE PROCEDURE update_totalstock_after_insertexit();

-- DELETE entry --
CREATE OR REPLACE FUNCTION update_totalstock_after_deleteentry() RETURNS TRIGGER AS
$BODY$
BEGIN
	UPDATE product
	SET total_stock = total_stock - OLD.quantity
	WHERE id = OLD.product_id;
	RETURN OLD;
END;
$BODY$
language plpgsql;

CREATE TRIGGER update_totalstock_after_deleteentry
AFTER DELETE ON entry
FOR EACH ROW
EXECUTE PROCEDURE update_totalstock_after_deleteentry();

-- DELETE exit --
CREATE OR REPLACE FUNCTION update_totalstock_after_deleteexit() RETURNS TRIGGER AS
$BODY$
BEGIN
	UPDATE product
	SET total_stock = total_stock + OLD.quantity
	WHERE id = OLD.product_id;
	RETURN OLD;
END;
$BODY$
language plpgsql;

CREATE TRIGGER update_totalstock_after_deleteexit
AFTER DELETE ON exit
FOR EACH ROW
EXECUTE PROCEDURE update_totalstock_after_deleteexit();

-- UPDATE entry --
CREATE OR REPLACE FUNCTION update_totalstock_after_updateentry() RETURNS TRIGGER AS
$BODY$
BEGIN
	UPDATE product
	SET total_stock = total_stock - OLD.quantity
	WHERE id = OLD.product_id;

	UPDATE product
	SET total_stock = total_stock + NEW.quantity
	WHERE id = NEW.product_id;

	RETURN NEW;
END;
$BODY$
language plpgsql;

CREATE TRIGGER update_totalstock_after_updateentry
AFTER UPDATE ON entry
FOR EACH ROW
EXECUTE PROCEDURE update_totalstock_after_updateentry();

-- UPDATE exit --
CREATE OR REPLACE FUNCTION update_totalstock_after_updateexit() RETURNS TRIGGER AS
$BODY$
BEGIN
	UPDATE product
	SET total_stock = total_stock + OLD.quantity
	WHERE id = OLD.product_id;

	UPDATE product
	SET total_stock = total_stock - NEW.quantity
	WHERE id = NEW.product_id;

	RETURN NEW;
END;
$BODY$
language plpgsql;

CREATE TRIGGER update_totalstock_after_updateexit
AFTER UPDATE ON exit
FOR EACH ROW
EXECUTE PROCEDURE update_totalstock_after_updateexit();