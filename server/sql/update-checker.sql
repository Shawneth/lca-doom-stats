CREATE TRIGGER should_update_change AFTER UPDATE
ON Zandronum
WHEN OLD.KeyName IS NOT 'shouldUpdate'
BEGIN
	UPDATE Zandronum SET Value = '1'
	WHERE KeyName = 'shouldUpdate';
END