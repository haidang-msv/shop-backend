import { Entity } from 'typeorm';

@Entity()
export class DatabaseEntity {
    // ko cần bất kỳ thuộc tính hay column nào ở đây,
    // chúng ta chỉ cần thực thi câu sql/store procedure/function từ db thông qua Repository<DatabaseEntity>
    // vậy nên Entity 'DatabaseEntity' này chỉ cần khai báo để lấy tên class
    // import vào service hoặc controller & module của chức năng cần gọi sp/fn từ db
    // tham khảo file categories.service.ts
}
