-- Trigger to reduce stock automatically when an order is placed
-- This trigger fires AFTER an order item is inserted

DELIMITER //

CREATE TRIGGER trg_reduce_stock_after_insert
AFTER INSERT ON orderitems
FOR EACH ROW
BEGIN
    -- Reduce the stock in menuitems table
    UPDATE menuitems 
    SET quantity = quantity - NEW.quantity
    WHERE menu_item_id = NEW.menu_item_id;
    
    -- Optional: You can add logic to check stock before insert
    -- But that's done with a separate BEFORE INSERT trigger
END//

DELIMITER ;

-- Optional: Check stock availability BEFORE insert (prevent insertion if not enough stock)
DELIMITER //

CREATE TRIGGER trg_check_stock_before_insert
BEFORE INSERT ON orderitems
FOR EACH ROW
BEGIN
    DECLARE available_stock INT;
    
    SELECT quantity INTO available_stock
    FROM menuitems
    WHERE menu_item_id = NEW.menu_item_id;
    
    IF available_stock < NEW.quantity THEN
        SIGNAL SQLSTATE '45000'
        SET MESSAGE_TEXT = 'Not enough stock available';
    END IF;
END//

DELIMITER ;
