drop procedure if exists signIn;
DELIMITER //
CREATE PROCEDURE signIn(
				IN hoivien varchar(255),
                IN matkhau varchar(255),
                IN maytinh int,
                out `status` boolean,
                out	session_id int
                )
BEGIN
    declare tai_khoan varchar(255);
    declare id_may_tinh int;
    declare latest_end_time_account datetime;
    declare start_time datetime;
    declare latest_end_time_pc datetime;
    select `account` into tai_khoan from `Hoi Vien` where `account` =  hoivien and `password`= matkhau;
    select id into id_may_tinh from `may tinh` where id = maytinh;
    if tai_khoan is not null and id_may_tinh is not null then
		select `gio ket thuc`, `gio bat dau` into latest_end_time_account, start_time 
        from `session` 
        where `tai khoan hv`= tai_khoan
        ORDER BY `gio bat dau` DESC
		LIMIT 1;
        select `gio ket thuc` into latest_end_time_pc
        from `session` 
        where `id may tinh` = id_may_tinh
        ORDER BY `gio bat dau` DESC
		LIMIT 1;
        if start_time is null then
			insert into `session` (`gio bat dau`,`id may tinh`,`tai khoan hv`) values (now(),maytinh,hoivien);
			set `status`=true;
            select `Session ID` into session_id from `session` where `id may tinh`=id_may_tinh and `gio ket thuc` is null;
        else
			if latest_end_time_account is null or latest_end_time_pc is null then
				set `status` = FALSE;
			else
				if latest_end_time_account > now() or latest_end_time_pc>now() then
                    set `status`=False;
				else
					insert into `session` (`gio bat dau`,`id may tinh`,`tai khoan hv`) values (now(),maytinh,hoivien);
					set `status`=true;
                    select `Session ID` into session_id from `session` where `id may tinh`=id_may_tinh and `gio ket thuc` is null;
				end if;
			end if;
		end if;
	ELSE
		set `status` = FALSE;
	END IF;
END; 
//
DELIMITER ;
DELIMITER //
create procedure signOutBySessionID(
	in session_id int
)
BEGIN
	update `session` set `gio ket thuc` = now() where `session id` = session_id;
END ;
//
DELIMITER ;
DELIMITER //
create procedure signOutByAccount(
	in `account` char(255)
)
BEGIN
	update `session` set `gio ket thuc` = now() where `tai khoan hv` = `account` and `gio ket thuc` is null;
END ;
//
DELIMITER ;
DELIMITER //
create procedure signOutByPCID(
	in pc_id int
)
BEGIN
	update `session` set `gio ket thuc` = now() where `id may tinh` = pc_id and `gio ket thuc` is null;
END ;
//
DELIMITER ;
DELIMITER //
-- for compute the  price
create procedure getDiscountForProduct(
	in product_id int,
    in so_luong int,
    in date_apply date,
    out ma_khuyen_mai int,
    out muc_giam float
)
begin
	select `khuyen mai`.`ma khuyen mai`, `muc giam` into ma_khuyen_mai, muc_giam from `khuyen mai` join `ap dung san pham` 
    on `khuyen mai`.`ma khuyen mai` = `ap dung san pham`.`ma khuyen mai`
    where `ap dung san pham`.`ma san pham` = product_id 
    and `khuyen mai`.`dieu kien` <= so_luong
    and `khuyen mai`.`ngay bat dau` <= date_apply 
    and `khuyen mai`.`ngay ket thuc`>=date_apply 
    order by `khuyen mai`.`muc giam` desc, `khuyen mai`.`ma khuyen mai` ASC 
    limit 1;
end;
//
DELIMITER ;

DELIMITER //
create procedure applyDiscountToBill(
	in bill_id int
)
begin
	declare muc_giam float;
    declare bill_cost int;
    declare id_khuyen_mai int;
    declare ngay_thuc_hien datetime;
	select `ngay thuc hien`, `tong tien` into ngay_thuc_hien,bill_cost from `hoa don` where `ma hoa don` = bill_id;
    select `ma khuyen mai` ,`muc_giam` into id_khuyen_mai,muc_giam from `khuyen mai` 
    where `loai` = 'bill' 
    and `dieu kien` <= bill_cost
    and ngay_thuc_hien >= `ngay bat dau`
    and ngay_thuc_hien <= `ngay ket thuc`;
    if id_khuyen_mai is not null then
		set bill_cost = (1-muc_giam)*bill_cost;
        insert into `ap dung hoa don` (`ma hoa don`, `ma khuyen mai`) values (bill_id,id_khuyen_mai);
        update `hoa don` set `tong tien` = bill_cost where `ma hoa don`=bill_id;
    end if;
end;
//
DELIMITER ;
DELIMITER //
create procedure addNewDiscount(
	in id int,
    in program_name varchar(255),
    in program_description varchar(255),
    in start_datetime datetime,
    in end_datetime datetime,
    in apply_on_bill boolean,
    in dieu_kien int,
    in muc_giam float
)
begin
	declare loai_km varchar(255);
    if apply_on_bill then
		set loai_km = 'bill';
	else
		set loai_km = 'product';
    end if;
    insert into `khuyen mai` (`ma khuyen mai`,`ten chuong trinh`,`mo ta`,`ngay bat dau`,`ngay ket thuc`,loai,`dieu kien`,`muc giam`)
    values (id,program_name,program_description,start_datetime,end_datetime,loai_km,dieu_kien,muc_giam);
end;
//
DELIMITER ;
DELIMITER //
create procedure addNewProductForDiscount(
	in discount_id int,
    in product_id int
)
begin
	insert into `ap dung san pham` (`ma san pham`, `ma khuyen mai`) values (product_id,discount_id);
end;
//
DELIMITER ;


DELIMITER //
CREATE PROCEDURE thongKeKhuyenMai(
	in ma_khuyen_mai int
)
BEGIN
	Select ct.`ma san pham`, ct.`so luong`
    from `hoa don` as hd natural join
	(SELECT *
	FROM chua as c natural join
	(SELECT km.`ngay bat dau`, km.`ngay ket thuc`,adsp.`ma san pham` 
    from `khuyen mai` AS km 
    natural join `ap dung san pham` as adsp
    where  km.`ma khuyen mai`= ma_khuyen_mai and km.`ma khuyen mai` = adsp.`ma khuyen mai`) as spkm
	where spkm.`ma san pham` = c.`ma san pham`) AS ct
    where hd.`ma hoa don` = ct.`ma hoa don` 
    and hd.`ngay thuc hien` >= ct.`ngay bat dau` 
    and hd.`ngay thuc hien` <= ct.`ngay ket thuc`;
END;
//
DELIMITER ;
DELIMITER //
CREATE PROCEDURE getTotalTimeByPCConfigID(
	in configID int
)
BEGIN
	select ss.`gio bat dau`, ss.`gio ket thuc`, pc.ID 
    from `Session` as ss 
    join `may tinh` as pc
    on pc.ID = ss.`ID may tinh`
    where pc.`id cau hinh` = configID;
END;
//
DELIMITER ;
DELIMITER //
CREATE PROCEDURE getCostByPCid(
	in pcID int
)
BEGIN
	SELECT `may tinh`.ID,`phu thu`, `gia` from
    `may tinh` JOIN `cau hinh` JOIN `khu vuc`
    ON `may tinh`.`phan loai khu vuc` = `khu vuc`.`loai khu vuc` and `may tinh`.`id cau hinh` = `cau hinh`.ID
    WHERE `may tinh`.ID = pcID;
END;
//
DELIMITER ;
DELIMITER //
CREATE PROCEDURE updateUserBalance(
	in balanceChange int, -- balanceChange < 0 if minus, >0 if add to account,
    in accountHV char(255)
)
BEGIN
	DECLARE currentBalance int;
	SELECT `so du` into currentBalance from `hoi vien` where `account` = accountHV;
    SET currentBalance = balanceChange + currentBalance;
    UPDATE `hoi vien` SET `so du` = currentBalance where `acount` = accountHV;
END ;
//
DELIMITER ;
DELIMITER //
CREATE PROCEDURE getUserData(
	in accountHV char(255),
    in passwordHV char(255)
)
BEGIN
	SELECT * FROM `hoi vien` WHERE `account`=accountHV and `password` = passwordHV;
END;
//
DELIMITER ;
drop procedure if exists UpdateHoiVienRecord;
DELIMITER //
CREATE PROCEDURE UpdateHoiVienRecord(
    IN p_account CHAR(255),
    IN `old_password` CHAR(255),
    IN p_password CHAR(255),
    IN p_ten CHAR(255),
    IN p_sdt CHAR(10),
    IN p_email CHAR(255),
    IN p_level INT
)
BEGIN
    -- Update a record in the Hoi Vien table
    UPDATE `Hoi Vien`
    SET
        `password` = p_password,
        `ten` = p_ten,
        `sdt` = p_sdt,
        `email` = p_email,
        `level` = p_level
    WHERE
        `account` = p_account
        and `password` = `old_password`;
END; //
DELIMITER ;
DELIMITER //
CREATE PROCEDURE getPassword(
	in p_account char(255)
)
BEGIN
	select `password` from `hoi vien` where `account` = p_account;
END;
//
DELIMITER ;

DELIMITER //
CREATE PROCEDURE SelectHoiVienInfo()
BEGIN
    SELECT
        `ten` AS `name`,
        `sdt` AS `phoneNumber`,
        `email`,
        `so du` AS `balance`,
        `level`
    FROM
        `Hoi Vien`;
END //
DELIMITER ;

DELIMITER //

CREATE PROCEDURE AddHoiVien(
    IN p_account CHAR(255),
    IN p_password CHAR(255),
    IN p_ten CHAR(255),
    IN p_sdt CHAR(10),
    IN p_email CHAR(255)
)
BEGIN
    IF p_account IS NULL THEN
        SIGNAL SQLSTATE '45001'
        SET MESSAGE_TEXT = 'p_account must have a non-null value';
    END IF;

    IF p_password IS NULL THEN
        SIGNAL SQLSTATE '45002'
        SET MESSAGE_TEXT = 'p_password must have a non-null value';
    END IF;

    IF p_ten IS NULL THEN
        SIGNAL SQLSTATE '45003'
        SET MESSAGE_TEXT = 'p_ten must have a non-null value';
    END IF;

    IF p_sdt IS NULL THEN
        SIGNAL SQLSTATE '45004'
        SET MESSAGE_TEXT = 'p_sdt must have a non-null value';
    END IF;

    IF p_email IS NULL THEN
        SIGNAL SQLSTATE '45005'
        SET MESSAGE_TEXT = 'p_email must have a non-null value';
    END IF;

    IF NOT REGEXP_LIKE(p_sdt, '^[0-9]+$') THEN
        SIGNAL SQLSTATE '45006'
        SET MESSAGE_TEXT = 'p_sdt must contain only numeric digits';
    END IF;

    IF EXISTS (SELECT 1 FROM `Hoi Vien` WHERE email = p_email) THEN
        SIGNAL SQLSTATE '45007'
        SET MESSAGE_TEXT = 'p_email must be distinct and not appear in other rows';
    END IF;

    IF EXISTS (SELECT 1 FROM `Hoi Vien` WHERE sdt = p_sdt) THEN
        SIGNAL SQLSTATE '45008'
        SET MESSAGE_TEXT = 'p_sdt must be distinct and not appear in other rows';
    END IF;

    INSERT INTO `Hoi Vien` (
        `account`,
        `password`,
        `ten`,
        `sdt`,
        `email`
    ) VALUES (
        p_account,
        p_password,
        p_ten,
        p_sdt,
        p_email
    );
END;

//

DELIMITER ;

DELIMITER //
CREATE PROCEDURE SelectKhuyenMaiInfo()
BEGIN
    SELECT
        `ma khuyen mai` AS `id`,
        `ten chuong trinh` AS `discountName`,
        `mo ta` AS `description`,
        `ngay bat dau` AS `startDate`,
        `ngay ket thuc` AS `endDate`,
        `loai` AS `category`,
        `dieu kien` AS `condition`,
        `muc giam` AS `discountValue`
    FROM
        `Khuyen Mai`;
END //
DELIMITER ;

DELIMITER //

CREATE PROCEDURE InsertKhuyenMai(
    IN p_ten_chuong_trinh CHAR(255),
    IN p_mo_ta CHAR(255),
    IN p_ngay_bat_dau DATETIME,
    IN p_ngay_ket_thuc DATETIME,
    IN p_loai CHAR(255),
    IN p_dieu_kien INT,
    IN p_muc_giam FLOAT
)
BEGIN
    IF p_ten_chuong_trinh IS NULL THEN
        SIGNAL SQLSTATE '45001'
        SET MESSAGE_TEXT = 'p_ten_chuong_trinh must have a non-null value';
    END IF;

    IF p_mo_ta IS NULL THEN
        SIGNAL SQLSTATE '45002'
        SET MESSAGE_TEXT = 'p_mo_ta must have a non-null value';
    END IF;

    IF p_ngay_bat_dau IS NULL THEN
        SIGNAL SQLSTATE '45003'
        SET MESSAGE_TEXT = 'p_ngay_bat_dau must have a non-null value';
    END IF;

    IF p_ngay_ket_thuc IS NULL THEN
        SIGNAL SQLSTATE '45004'
        SET MESSAGE_TEXT = 'p_ngay_ket_thuc must have a non-null value';
    END IF;

    IF p_loai IS NULL THEN
        SIGNAL SQLSTATE '45005'
        SET MESSAGE_TEXT = 'p_loai must have a non-null value';
    END IF;

    IF p_dieu_kien IS NULL OR p_dieu_kien <= 0 THEN
        SIGNAL SQLSTATE '45006'
        SET MESSAGE_TEXT = 'p_dieu_kien must be a non-null integer greater than 0';
    END IF;

    IF p_muc_giam IS NULL OR p_muc_giam <= 0 OR p_muc_giam >= 1 THEN
        SIGNAL SQLSTATE '45007'
        SET MESSAGE_TEXT = 'p_muc_giam must be a non-null float greater than 0 and less than 1';
    END IF;

    INSERT INTO `Khuyen Mai` (
        `ten chuong trinh`,
        `mo ta`,
        `ngay bat dau`,
        `ngay ket thuc`,
        loai,
        `dieu kien`,
        `muc giam`
    ) VALUES (
        p_ten_chuong_trinh,
        p_mo_ta,
        p_ngay_bat_dau,
        p_ngay_ket_thuc,
        p_loai,
        p_dieu_kien,
        p_muc_giam
    );
END //

DELIMITER ;

DELIMITER //

CREATE PROCEDURE GetKhuyenMaiInfoForSanPham(IN p_ma_san_pham INT)
BEGIN
    IF p_ma_san_pham IS NULL OR p_ma_san_pham <= 0 THEN
        SIGNAL SQLSTATE '45000'
        SET MESSAGE_TEXT = 'p_ma_san_pham must be a non-null positive integer';
        RETURN;
    END IF;
    
    SELECT km.`dieu kien` AS `condition`, km.`muc giam` AS `discountValue`
    FROM `Ap Dung San Pham` ap
    JOIN `Khuyen Mai` km ON ap.`ma khuyen mai` = km.`ma khuyen mai`
    WHERE ap.`ma san pham` = p_ma_san_pham;
END //

DELIMITER ;

CREATE PROCEDURE GetMayTinhInfo(IN may_tinh_id INT)
BEGIN
    SELECT ch.`gia` AS `price`, kv.`phu thu` AS `additionalCharge`
    FROM May_Tinh mt
    JOIN Cau_Hinh ch ON mt.`id cau hinh` = ch.ID
    JOIN Khu_Vuc kv ON mt.`phan loai khu vuc` = kv.`loai khu vuc`
    WHERE mt.ID = may_tinh_id;
END;

DELIMITER //

CREATE PROCEDURE GetActiveSessions()
BEGIN
    SELECT `Session ID` AS `id`, `gio bat dau` AS `startTime`, `id may tinh` AS `computerId`, `tai khoan hv` AS `memberId`
    FROM `Session`
    WHERE `gio ket thuc` IS NULL;
END //

DELIMITER ;

DELIMITER //

CREATE PROCEDURE GetActiveSessionsByIdMayTinh(IN may_tinh_id INT)
BEGIN
    IF may_tinh_id IS NULL THEN
        SIGNAL SQLSTATE '45000'
        SET MESSAGE_TEXT = 'May Tinh ID cannot be null';
        RETURN;
    END IF;

    SELECT `Session ID` AS `id`, `gio bat dau` AS `startTime`, `id may tinh` AS `computerId`, `tai khoan hv` AS `memberId`
    FROM `Session`
    WHERE `gio ket thuc` IS NULL AND `id may tinh` = may_tinh_id;
END //

DELIMITER ;

DELIMITER //

CREATE PROCEDURE GetActiveSessionsByTaiKhoanHV(IN tai_khoan_hv VARCHAR(255))
BEGIN
    IF tai_khoan_hv IS NULL OR tai_khoan_hv = '' THEN
        SIGNAL SQLSTATE '45000'
        SET MESSAGE_TEXT = 'Tai Khoan HV cannot be null or empty';
        RETURN;
    END IF;

    SELECT `Session ID` AS `id`, `gio bat dau` AS `startTime`, `id may tinh` AS `computerId`, `tai khoan hv` AS `memberId`
    FROM `Session`
    WHERE `gio ket thuc` IS NULL AND `tai khoan hv` = tai_khoan_hv;
END //

DELIMITER ;

DELIMITER //

CREATE PROCEDURE InsertHoaDon(IN tai_khoan_hv VARCHAR(255), IN id_le_tan INT)
BEGIN
    DECLARE existing_account INT;
    DECLARE existing_le_tan INT;

    IF tai_khoan_hv IS NULL OR tai_khoan_hv = '' THEN
        SIGNAL SQLSTATE '45000'
        SET MESSAGE_TEXT = 'Tai Khoan HV cannot be null or empty';
        RETURN;
    END IF;

    IF id_le_tan IS NULL THEN
        SIGNAL SQLSTATE '45000'
        SET MESSAGE_TEXT = 'ID Le Tan cannot be null';
        RETURN;
    END IF;

    SELECT COUNT(*) INTO existing_account
    FROM `Hoi Vien`
    WHERE `account` = tai_khoan_hv;

    IF existing_account = 0 THEN
        SIGNAL SQLSTATE '45000'
        SET MESSAGE_TEXT = 'Tai Khoan HV does not exist';
        RETURN;
    END IF;

    SELECT COUNT(*) INTO existing_le_tan
    FROM `Le Tan`
    WHERE `ID` = id_le_tan;

    IF existing_le_tan = 0 THEN
        SIGNAL SQLSTATE '45000'
        SET MESSAGE_TEXT = 'ID Le Tan does not exist';
        RETURN;
    END IF;

    INSERT INTO `Hoa Don` (`ngay thuc hien`, `tong tien`, `tai khoan hv`, `id le tan`)
    VALUES (NOW(), 0, tai_khoan_hv, id_le_tan);
END //

DELIMITER ;

DELIMITER //

CREATE PROCEDURE addProductToBill(
    IN p_product_id INT,
    IN p_so_luong INT,
    IN p_bill_id INT
)
BEGIN
    DECLARE date_apply DATETIME;
    DECLARE muc_giam FLOAT;
    DECLARE ma_khuyen_mai INT;
    DECLARE thanh_tien INT;
    DECLARE bill_cost INT;
    DECLARE available_quantity INT;

    IF p_product_id IS NULL OR p_so_luong IS NULL OR p_bill_id IS NULL THEN
        SIGNAL SQLSTATE '45000'
        SET MESSAGE_TEXT = 'Input parameters cannot be null';
        RETURN;
    END IF;

    IF p_product_id <> 1 THEN
        SELECT `so luong` INTO available_quantity
        FROM `Dich Vu Them`
        WHERE `ma san pham` = p_product_id;

        IF available_quantity = 0 THEN
            SIGNAL SQLSTATE '45000'
            SET MESSAGE_TEXT = 'Error: So luong in Dich Vu Them is 0';
            RETURN;
        END IF;

        IF available_quantity < p_so_luong THEN
            SET p_so_luong = available_quantity;
        END IF;
    END IF;

    SELECT `ngay thuc hien` INTO date_apply FROM `Hoa Don` WHERE `ma hoa don` = p_bill_id;
    CALL getDiscountForProduct(p_product_id, p_so_luong, date_apply, ma_khuyen_mai, muc_giam);

    SELECT `gia niem yet` INTO thanh_tien FROM `San Pham` WHERE `ma san pham` = p_product_id;

    SELECT `tong tien` INTO bill_cost FROM `Hoa Don` WHERE `ma hoa don` = p_bill_id;

    IF muc_giam IS NOT NULL THEN
        SET thanh_tien = (1 - muc_giam) * thanh_tien * p_so_luong;
    END IF;

    SET bill_cost = bill_cost + thanh_tien;
    UPDATE `Hoa Don` SET `tong tien` = bill_cost WHERE `ma hoa don` = p_bill_id;

    INSERT INTO `Chua` (`ma hoa don`, `ma san pham`, `so luong`) VALUES (p_bill_id, p_product_id, p_so_luong);

    IF p_product_id <> 1 THEN
        UPDATE `Dich Vu Them`
        SET `so luong` = available_quantity - p_so_luong
        WHERE `ma san pham` = p_product_id;
    END IF;
END //

DELIMITER ;

DELIMITER //

CREATE PROCEDURE GetProductInfo(IN p_ten_san_pham VARCHAR(255))
BEGIN
    DECLARE product_id INT;

    IF p_ten_san_pham IS NULL OR p_ten_san_pham = '' THEN
        SIGNAL SQLSTATE '45000'
        SET MESSAGE_TEXT = 'Ten San Pham cannot be null or empty';
        RETURN;
    END IF;

    SELECT `ma san pham` INTO product_id
    FROM `San Pham`
    WHERE LOWER(`ten san pham`) LIKE LOWER(CONCAT('%', p_ten_san_pham, '%'));

    IF product_id = 1 THEN
        SELECT `ma san pham` AS `productId`, `ten san pham` AS `name`, `gia niem yet` AS `price`
        FROM `San Pham`;
    ELSE
        SELECT sp.`ma san pham` AS `productId`, sp.`ten san pham` AS `name`, sp.`gia niem yet` AS `price`, dv.so_luong AS `instock`
        FROM `San Pham` sp
        JOIN `Dich Vu Them` dv ON sp.`ma san pham` = dv.`ma san pham`
        WHERE LOWER(sp.`ten san pham`) LIKE LOWER(CONCAT('%', p_ten_san_pham, '%'));
    END IF;
END //

DELIMITER ;

DELIMITER //

CREATE PROCEDURE GetHoaDonByMaHoaDon(IN p_ma_hoa_don INT)
BEGIN
    IF p_ma_hoa_don IS NULL THEN
        SIGNAL SQLSTATE '45000'
        SET MESSAGE_TEXT = 'Ma Hoa Don cannot be null';
        RETURN;
    END IF;

    SELECT `ma hoa don` AS `id`, `ngay thuc hien` AS `date`, `tong tien` AS `totalPrice`, `tai khoan hv` AS `memberId`, `id le tan` AS `employeeId`
    FROM `Hoa Don`
    WHERE `ma hoa don` = p_ma_hoa_don;
END //

DELIMITER ;


DELIMITER //

CREATE PROCEDURE GetChuaByMaHoaDon(IN p_ma_hoa_don INT)
BEGIN
    IF p_ma_hoa_don IS NULL THEN
        SIGNAL SQLSTATE '45000'
        SET MESSAGE_TEXT = 'Ma Hoa Don cannot be null';
        RETURN;
    END IF;

    SELECT c.`ma san pham` AS `productId`, c.`so luong` AS `quantity`, sp.`ten san pham` AS `name`, sp.`gia niem yet` AS `price`
    FROM `Chua` c
    JOIN `San Pham` sp ON c.`ma san pham` = sp.`ma san pham`
    WHERE c.`ma hoa don` = p_ma_hoa_don;
END //

DELIMITER ;


-- DELIMITER //
-- CREATE PROCEDURE addProductToBill(
--     IN product_id INT,
--     IN so_luong INT,
--     IN bill_id INT
-- )
-- begin
-- 	DECLARE date_apply datetime;
--     DECLARE muc_giam FLOAT;
--     declare ma_khuyen_mai int;
--     DECLARE thanh_tien INT;
--     DECLARE bill_cost INT;
--     SELECT `ngay thuc hien` INTO date_apply FROM `hoa don` WHERE `ma hoa don` = bill_id;
--     CALL getDiscountForProduct(product_id, so_luong, date_apply,ma_khuyen_mai,muc_giam);
--     SELECT `gia niem yet` INTO thanh_tien FROM `san pham` WHERE `ma san pham` = product_id;
--     SELECT `tong tien` INTO bill_cost FROM `hoa don` WHERE `ma hoa don` = bill_id;
--     IF muc_giam IS NOT NULL THEN
--         SET thanh_tien = (1 - muc_giam) * thanh_tien*so_luong;
--     END IF;

--     SET bill_cost = bill_cost + thanh_tien;
--     UPDATE `hoa don` SET `tong tien` = bill_cost WHERE `ma hoa don` = bill_id;

--     INSERT INTO `chua` (`ma hoa don`, `ma san pham`, `so luong`) VALUES (bill_id, product_id, so_luong);
-- end;
-- //
-- DELIMITER ;