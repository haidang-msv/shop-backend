if object_id('Categories') is not null drop table Categories
go
create table Categories(	
	Id bigint identity(1,1) primary key
    , ParentId bigint default(null)
	, Ename nvarchar(200) not null
	, Vname nvarchar(200) default('')
	, Jname nvarchar(200) default('')
	, [Description] nvarchar(200) default('')
	, Photo nvarchar(200) default('')
	, NoUsed bit default(0)
    , CreatedDate datetime default(getdate())
    , EditedDate datetime
)
go
insert into Categories(Ename, Vname, Jname)
select Ename, Vname=Ename, Jname=Ename from (
	select Ename=N'' where 1=0
	union all select N'Đồ ăn'
	union all select N'Đồ uống'
	union all select N'Topping'
) t
go
insert into Categories(ParentId, Ename, Vname, Jname)
select ParentId, Ename, Vname=Ename, Jname=Ename from (
	select ParentId=0, Ename=N'' where 1=0
	union all select 1, N'Ăn vặt'
	union all select 1, N'Hủ tíu'
	union all select 1, N'Cơm'
	union all select 1, N'Bún'
	union all select 1, N'Cháo'
	union all select 1, N'Phở'
) t
go
insert into Categories(ParentId, Ename, Vname, Jname)
select ParentId, Ename, Vname=Ename, Jname=Ename from (
	select ParentId=0, Ename=N'' where 1=0
	union all select 4, N'Chuối chiên'
	union all select 4, N'Chân gà'
	union all select 4, N'Trà sữa'
	union all select 5, N'Hủ tíu gà'
	union all select 5, N'Hủ tíu heo'
	union all select 5, N'Hủ tíu bò viên'
) t
go
-- select * from Categories
