USE `internet_store`;
insert into `San Pham` (`ma san pham`, `gia niem yet`, `ten san pham`) 
values 
(1,1000,'gio choi'),
(2,15000,'mi tom'),
(3, 50000,'card viettel');
insert into `Gio Choi` (`ma san pham`) values (1);
insert into `Hoi Vien` (`account`, `ten`,`email`,`password`,`sdt`) values
('hahaha','khach','io@hcmut.edu.vn','$2a$12$z.RpqTSe07c5UkPv2a0gXuva4CqyNYlAaafi7kws.Vf0mVnzAIBSG','0909'),
('hieudz1402','The Hieu','abc@abc.abc','$2a$12$z.RpqTSe07c5UkPv2a0gXuva4CqyNYlAaafi7kws.Vf0mVnzAIBSG','113');
insert into `nhan vien` (`ho ten`,`gioi tinh`,`ngay sinh`,`ngay ki ket`,`ngay het han`) values ('nhanvien1', 1, '2003-01-01', '2023-01-01', '2024-01-01');
insert into `Le Tan` (id, `account`, `password`,`lich truc`) values (1,'nhanvien1','123','thu 2 thu 3 thu 4');
insert into `Hoa Don` (`ma hoa don`,`ngay thuc hien`,`tai khoan hv`,`id le tan`) values (1,NOW(),'hieudz1402',1);
insert into `Chua` (`ma hoa don`, `ma san pham`, `so luong`) values (1,1,10);
insert into `Nha Cung Cap` (id,sdt,ten,address) 
values 
(1,'666','hao hao','tphcm'),
(2,'999','viettel','tphcm');
insert into `dich vu them` (`ma san pham`,`id nha cung cap`,`so luong`,`loai san pham`) 
values
(2,1,0,'do an'),
(3,2,0,'the nap');
insert into `hoa don chi` (`ma hoa don`,`ngay thuc hien`,`id le tan`) values (1,curdate(),1);
insert into `ghi hoa don chi` (`ma hoa don chi`,`ma san pham`, `so luong`,`gia nhap`) values (1,2,100,3000);
insert into `cau hinh` (id,`kich thuoc man hinh`,`cpu`,`card do hoa`,`ram`,`tan so man hinh`,`gia`) 
values
(1,24,'i5','rtx-3060',16,60,6000),
(2,30,'i7','rtx-3080',32,120,1000),
(3,33,'i7','rtx-3100',32,240,10000);
insert into `khu vuc` (`loai khu vuc`, `phu thu`) 
values
('khong may lanh',0),
('may lanh',1000),
('su kien',5000);
insert into `may tinh` (id,hang,`ngay mua`,`phan loai khu vuc`,`id cau hinh`) 
values
(1,'dell',curdate(),'may lanh',1),
(2,'hp',curdate(),'su kien',3),
(3,'intel',curdate(),'khong may lanh',2);
insert into `khuyen mai` (`ma khuyen mai`,`ten chuong trinh`,`ngay bat dau`,`ngay ket thuc`,`loai`,`dieu kien`,`muc giam`) 
values (2023,'happy net','2022-01-01','2025-01-01','product',2,0.5);
insert into `ap dung san pham` (`ma san pham`, `ma khuyen mai`) values (2,2023);
call  addNewDiscount(112023,'new member',NULL,now(),'2024-01-01 00:00:00',True,100000,0.2);
