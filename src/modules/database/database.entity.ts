import { Entity } from 'typeorm';

// đây là entity ảo, không có thực trong db (ko tương ứng với bất kỳ table nào trong db)
// được dùng để thực thi/truy vấn dữ liệu thông Repository chung cho tất cả các module của tất cả entity object.
// (thay vì phải dùng chính entity của module để gọi sp/fn,
// thì ta dùng entity database này để gọi, mà ko cần định nghĩa entity riêng.)

@Entity()
export class Database {
    // ko cần bất kỳ thuộc tính hay column nào ở đây,
    // chúng ta chỉ cần thực thi [câu sql/store procedure/function] từ db thông qua [Repository<DatabaseEntity>]
    // vậy nên Entity 'Database' này chỉ cần khai báo để lấy tên class
    // import vào service hoặc controller & module của chức năng cần gọi sp/fn từ db
    // tham khảo file [database.service.ts] hoặc [categories.service.ts]
}
