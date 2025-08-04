
if object_id('MenuItemOptions') is not null drop table MenuItemOptions
go
create table MenuItemOptions(	
	Id bigint identity(1,1) primary key
	, Ename nvarchar(200) not null
	, Vname nvarchar(200) null default('')
	, Jname nvarchar(200) null default('')
	, Price numeric(28,10) null default(0)
	, [Description] nvarchar(200) null default('')
	, Photo nvarchar(200) null default('')
	, NoUsed bit default(0)
	, MenuItemId bigint not null
)
go
--select * from Menus
insert into MenuItemOptions(Ename, Vname, Jname, MenuItemId)
select Ename, Vname=Ename, Jname=Ename, MenuItemId from (
	select Ename=N'', MenuItemId=0 where 1=0
	union all select N'Giò heo thêm', 1
	union all select N'Giò heo thêm', 2
	union all select N'Giò heo thêm', 3
	union all select N'Giò heo thêm', 4

	union all select N'Phô mai', 6
	union all select N'Nước cốt dừa', 6
	union all select N'Phô mai', 7
	union all select N'Nước cốt dừa', 7

	union all select N'Đu đủ thêm', 9
	union all select N'Xoài thêm', 9
	union all select N'Cóc thêm', 9
	union all select N'Đu đủ thêm', 10
	union all select N'Xoài thêm', 10
	union all select N'Cóc thêm', 10
	union all select N'Đu đủ thêm', 11
	union all select N'Xoài thêm', 11
	union all select N'Cóc thêm', 11
) t
go
--select * from MenuItemOptions

