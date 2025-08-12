
if object_id('Users') is not null drop table Users
go
create table Users
(
    Id bigint identity(1,1) primary key
    , Email varchar(50) not null unique
    , UserCode varchar(50) not null unique
	, UserPass nvarchar(200) null --hashed
    , UserRole varchar(50) default('')
    , Fullname nvarchar(200) default('')
    , [Address] nvarchar(200) default('')
    , Photo nvarchar(200) default('')
    , AccountType nvarchar(200) default('')--local,gg,github
    , IsActive bit default(0)
    , ActiveCode nvarchar(200) default('')
    , ExpiredCode datetime
    , CreatedDate datetime default(getdate())
    , EditedDate datetime
)
go
insert into Users
    (Email, UserCode, IsActive)
values
    ('admin@shopmail.com', 'admin', 1),
    ('user1@webmail.com', 'user', 0),
    ('alex-2hand@webmail.com', 'alex', 1),
    ('mira-1leg@webmail.com', 'mira', 1)
go
--select * from Users

