import * as process from 'node:process';
import { registerAs } from '@nestjs/config'; 
/*
registerAs được sử dụng để quản lý các cấu hình tùy chỉnh của namespacing configs.
tức là, ta sẽ định nghĩa một đối tượng cấu hình và xuất nó bằng nestjs registerAs(),
cung cấp một không gian tên (tiền tố - db) cho cấu hình để tránh xung đột giữa những key cấu hình khác (nếu có).
*/

const dbConfig = () => ({
    type: process.env.DB_TYPE || 'mssql',
    host: process.env.DB_HOST || 'UBUNTU-HD',//'THIN19\\SQL2016',//
    port: process.env.DB_PORT || 1433,
    user: process.env.DB_USER || 'sa',
    pass: process.env.DB_PASS || 'Bhdang@9818.com',//'s@1234',//
    name: process.env.DB_NAME || 'ShopData',
    // entities: [__dirname + '/*.entity{.ts,.js}'], // load all of entity file in [dirname] module without import Entity Class
    options: {
        encrypt: false, // MSSQL-specific option
    },
//   database: process.env.DB_TYPE || 'mysql',
//   connection: {
//     mysql: {
//       type: 'mysql',
//       host: process.env.DB_HOST || 'localhost',
//       port: parseInt(process.env.DB_PORT, 10) || 3306,
//       username: process.env.DB_USERNAME || 'root',
//       password: process.env.DB_PASSWORD || '',
//       database: process.env.DB_NAME || '',
//       entities: ['./../Models/*.entity{.ts,.js}'],
//     },
//   },
});

export default registerAs('db', dbConfig);
