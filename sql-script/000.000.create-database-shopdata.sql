/*
Để lệnh DROP DATABASE hoạt động bình thường,
ta cần thiết lập trạng thái truy cập database mục tiêu (DB) thành single-user.
Tuy nhiên, để thực thi lệnh ALTER DATABASE, thì ta phải chạy lệnh từ bên trong DB.
Nhưng nếu DB không tồn tại, thì khi thực thi câu lệnh sẽ bị lỗi.
Nên ta phải thực thi lệnh bằng câu sql động.
Bằng cách đó, ta sẽ là người dùng duy nhất giữ khóa phiên cần thiết trên DB.
Mặc dù sau đó ta chuyển thao tác sang database master,
ta vẫn giữ khóa phiên cần thiết trên DB, và lệnh drop sẽ hoạt động như mong đợi.
*/
use master
go
declare @sql nvarchar(max)
if exists (select top 1 IsExists=1 from sys.databases where [name]='ShopData') begin
	set @sql = N'
	print ''switch to target db''
	use ShopData;

	print ''set access sate to single-user''
	alter database ShopData set single_user with rollback immediate;

	print ''switch to master db to quit target db''
	use master;

	print ''delete target db''
	drop database ShopData;
	'
	print 'execute command set'
    exec(@sql)
end
use master
print N'create new target database'
create database ShopData
go
use ShopData
print N'create successful.'