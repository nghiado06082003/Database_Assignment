USE internet_store;
DELIMITER //

CREATE FUNCTION getPCPrice(pc_id INT)
RETURNS INT
DETERMINISTIC
BEGIN
    DECLARE price INT;
    DECLARE phuthu INT;

    SELECT gia INTO price FROM `may tinh` 
    JOIN `cau hinh` ON `may tinh`.`id cau hinh` = `cau hinh`.ID 
    WHERE `may tinh`.ID = pc_id;

    SELECT `phu thu` INTO phuthu FROM `may tinh` 
    JOIN `khu vuc` ON `may tinh`.`loai khu vuc` = `khu vuc`.`loai khu vuc` 
    WHERE `may tinh`.ID = pc_id;
	
    SET price = price + phuthu;
    RETURN price;
END;
//
DELIMITER ;
