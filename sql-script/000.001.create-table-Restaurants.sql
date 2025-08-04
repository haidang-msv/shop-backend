if object_id('Restaurants') is not null drop table Restaurants
go
create table Restaurants
(
	Id bigint identity(1,1) primary key
	,
	Ename nvarchar(200) not null
	,
	Vname nvarchar(200) default('')
	,
	Jname nvarchar(200) default('')
	,
	[Address] nvarchar(200) default('')
	,
	[Description] nvarchar(200) default('')
	,
	Phone nvarchar(200) default('')
	,
	Email nvarchar(200) default('')
	,
	Rating nvarchar(200) default('')
	,
	Photo nvarchar(200) default('')
	,
	NoUsed bit default(0)
	,
	CreatedDate datetime default(getdate())
    ,
	EditedDate datetime
)
go
insert into Restaurants
	(Ename, Vname, Jname, [Address])
select Ename, Vname=Ename, Jname=Ename, [Address]
from (
									select Ename=N'', [Address]=N''
		where 1=0
	union all
		select N'Thành Đạt - Hủ Tiếu Nam Vang - Hoàng Hoa Thám', N'1A Hoàng Hoa Thám, P. 13, Tân Bình, TP. HCM'
	union all
		select N'Chuối Cười - Xóm Chiếu', N'196D Xóm Chiếu, P. 14, Quận 4, TP. HCM'
	union all
		select N'Hỷ Lạc - Chân Gà Sốt Thái', N'49 Tô Hiến Thành, P. 13, Quận 10, TP. HCM'
) t
go
--select * from Restaurants

