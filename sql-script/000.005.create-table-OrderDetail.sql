
if object_id('OrderDetails') is not null drop table OrderDetails
go
create table OrderDetails(	
	Id bigint identity(1,1) primary key   
    , Remark nvarchar(200) default('')
	, OrderId bigint not null --FK
    , MenuItem bigint not null --FK
    , MenuItemOption bigint null --FK
)
go
insert into OrderDetails(OrderId, MenuItem, MenuItemOption) values
(1, 4, 1)
, (2, 7, 6)
, (2, 8, null)
go
--select * from OrderDetails

