if object_id('MenuItems') is not null drop table MenuItems
go
create table MenuItems(	
	Id bigint identity(1,1) primary key
	, Ename nvarchar(200) not null
	, Vname nvarchar(200) default('')
	, Jname nvarchar(200) default('')
	, BasePrice numeric(28,10) default(0)
	, [Description] nvarchar(200) default('')
	, Photo nvarchar(200) default('')
	, NoUsed bit default(0)
	, CategoryId bigint not null
)
go
--select * from Menus
insert into MenuItems(Ename, Vname, Jname, CategoryId)
select Ename, Vname=Ename, Jname=Ename, CategoryId from (
	select Ename=N'', CategoryId=0 where 1=0
	union all select N'Hủ Tiếu Gà', 1
	union all select N'Hủ Tiếu Heo', 1
	union all select N'Hủ Tiếu Dê', 1
	union all select N'Hủ Tiếu Bò Viên', 1

	union all select N'Chuối chiên bột', 2
	union all select N'Chuối nếp nướng', 2
	union all select N'Chuối hấp', 2
	union all select N'Chuối nướng', 2

	union all select N'Chân Gà Sả Tắc', 3
	union all select N'Chân Gà Sốt Thái', 3
	union all select N'Chân Gà Sốt Trứng Muối', 3
) t
go
--select * from MenuItems
