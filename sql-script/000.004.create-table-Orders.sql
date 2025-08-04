
if object_id('Orders') is not null drop table Orders
go
create table Orders(	
	Id bigint identity(1,1) primary key    
	, [Status] varchar(50) default('')
    , OrderTime datetime default(getdate())
    , DeliveryTime datetime
    , Remark nvarchar(200) default('')
	, RestaurantId bigint not null
	, UserCode varchar(50) not null
)
go
insert into Orders([Status], RestaurantId, UserCode) values
(N'Confirming', 1, 'alex')
, (N'Cancel', 2, 'mira')
go
--select * from Orders
