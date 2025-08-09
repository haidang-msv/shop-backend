import * as process from 'node:process';
import { registerAs } from '@nestjs/config'; 
/*
registerAs được sử dụng để quản lý các cấu hình tùy chỉnh của namespacing configs.
tức là, ta sẽ định nghĩa một đối tượng cấu hình và xuất nó bằng nestjs registerAs(),
cung cấp một không gian tên (tiền tố - app) cho cấu hình để tránh xung đột giữa những key cấu hình khác (nếu có).
*/

const appConfig = () => ({
    name: process.env.APP_NAME || 'Shop-backend',
    port: process.env.APP_PORT || 3000,
    env: process.env.APP_ENV || 'development', // 'production', //
    debug: process.env.APP_DEBUG === 'true',
    logging: process.env.APP_LOGGING === 'true',
    timezone: process.env.APP_TIMEZONE || 'UTC',
    locale: process.env.APP_LOCALE || 'en',
});

export default registerAs('app', appConfig);
