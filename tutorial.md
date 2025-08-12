# các bước xây dựng nestjs backend server

<!-- ##################################################################################################### -->

# cài đặt các công cụ cần thiết

## cài đặt nestjs cli (công cụ dòng lệnh thao tác với nestjs)
npm install -g @nestjs/cli
# hoặc cài đặt chính xác phiên bản
<!-- npm i -g --exact @nestjs/cli@11.0.10 -->

## cài đặt gói bcrypt
# bcrypt: gói thư viện để hash & compare password
# @types/bcrypt: gói type definitions cho thư viện bcrypt
npm i bcrypt @types/bcrypt
<!-- npm i --exact bcrypt@6.0.0 @types/bcrypt@6.0.0 -->

## cài đặt gói uuid - sinh id ngẫu nhiên tự động
npm i uuid
<!-- npm i --exact uuid@11.1.0 -->

## cài đặt gói dayjs - thao tác với kiểu ngày giờ
npm i dayjs
<!-- npm i --exact dayjs@1.11.13 -->

## cài đặt gói xml-js (chuyển đổi qua lại xml & js/json)
npm i xml-js
<!-- npm i --exact xml-js@1.6.11 -->

## cài đặt gói thao tác với biến môi trường từ file .env
npm i @nestjs/config
<!-- npm i --exact @nestjs/config@4.0.2 -->

## cài đặt typeorm
# typeorm: thư viện ánh xạ quan hệ đối tượng với csdl - Object Relational Mapped
# @nestjs/typeorm: thư viện module thao tác với các thực thể tương ứng trong csdl
npm i typeorm @nestjs/typeorm
<!-- npm i --exact typeorm@0.3.25 @nestjs/typeorm@11.0.0 -->

# các gói bổ sung cho typeorm
npm i reflect-metadata <!-- (0.2.2) -->
npm i @types/node <!-- gói type definitions cho thư viện node (24.2.1) hỗ trợ khi viết mã TypeScript -->
npm i -g ts-node <!-- để có thể thao tác trực tiếp code TypeScript trên Node mà ko cần biên dịch trước (10.9.2) -->

# cài đặt driver csdl để sử dụng với typeorm (https://typeorm.io/docs/getting-started)
# TypeORM hỗ trợ nhiều hệ quản trị csdl như MySQL, PostgreSQL, MariaDB, SQLite, MS SQL Server, Oracle...
# Tùy vào csdl mà cài đặt các gói thư viện thao tác cho phù hợp
npm i mssql <!-- Sql Server (11.0.1) -->
npm i mongodb <!-- MongoDB (6.18.0) -->
npm i mysql2 <!-- MySql hoặc MariaDB -->
npm i pg <!-- PostgreSQL hoặc CockroachDB -->
npm i sqlite3 <!-- Sqlite -->
npm i oracledb <!-- Oracle -->

## cài đặt gói class-validator & class-transformer (thư viện validator thao tác với dto - Data Transfer Object)
# class-validator: thư viện các decorator định nghĩa quy tắc validate dữ liệu
# class-transformer: thư viện các decorator định nghĩa dữ liệu
npm i class-validator class-transformer
<!-- npm i --exact class-validator@0.14.2 class-transformer@0.5.1 -->
# thư viện thao tác với dto khi validate nếu cần thiết (https://www.npmjs.com/package/@nestjs/mapped-types)
<!-- npm i @nestjs/mapped-types (2.1.0) -->

## cài đặt gói passport (hộ chiếu xác thực)
# passport: middleware xác thực thông qua một bộ plugin mở rộng được gọi là strategies.
# @nestjs/passport: thư viện các method/properties thao tác với passport
# passport-local: module xác thực username & password cục bộ trong ứng dụng
# @types/passport-local: gói type definitions cho thư viện passport-local hỗ trợ khi viết mã TypeScript
npm i passport @nestjs/passport passport-local
npm i @types/passport-local
<!-- npm i --exact passport@0.7.0 @nestjs/passport@11.0.5 passport-local@1.0.0 -->
<!-- npm i --exact @types/passport-local@1.0.38 -->

## cài đặt gói jwt (Json Web Token)
# @nestjs/jwt:  gói tiện ích hỗ trợ thao tác JWT
# passport-jwt: dùng để triển khai chiến lược xác thực JWT
# @types/passport-jwt: cung cấp các định nghĩa kiểu TypeScript.
npm i @nestjs/jwt passport-jwt
npm i @types/passport-jwt
<!-- npm i --exact @nestjs/jwt@11.0.0 passport-jwt@4.0.1 -->
<!-- npm i --exact @types/passport-jwt@4.0.1 -->

## cài đặt gói nodemailer dùng để gửi mail
# @nestjs-modules/mailer: module gửi mail sử dụng nodemailer
# nodemailer: core thực hiện gửi mail, cấu hình mail
# handlebars: sử dụng template để gửi mail
# @type/nodemailer: type definitions cho nodemailer
npm install @nestjs-modules/mailer nodemailer handlebars
npm install @type/nodemailer
<!-- npm install --exact @nestjs-modules/mailer@2.0.2 nodemailer@7.0.5 handlebars@4.7.8 -->
<!-- npm install --exact @type/nodemailer@6.4.17 -->

<!-- ##################################################################################################### -->

# cấu hình để chạy debug nest trong vs code
trong VS Code, nhấn Ctrl + Shift + D hoặc mở Run and Debug trong left panel.
trong Run and Debug panel, chọn [create launch.json file], chọn tiếp Node.js.
trong file launch.json vừa được tạo ra, copy và paste đoạn code cấu hình bên dưới vào file và save lại.

{
    "version": "0.2.0",
    "configurations": [
        {
            "type": "node",
            "request": "launch",
            "name": "Nest Debug",
            "runtimeExecutable": "npm",
            "runtimeArgs": [
                "run",
                "start:debug",
                "--",
                "--inspect-brk"
            ],
            "console": "integratedTerminal",
            "restart": true,
            "protocol": "auto",
            "port": 9229,
            "autoAttachChildProcesses": true
        }
    ]
}

Từ lúc này trở đi, có thể chạy app bằng chức năng Start Debugging trong menu Run của VS Code,
hoặc trong Run and Debug panel, hoặc phím F5.
<!-- file launch.json sẽ được lưu tại project-name/.vscode/launch.json -->

<!-- ##################################################################################################### -->

# cách viết và đọc file .env, file cấu hình biến môi trường

## tạo file .env và nội dung
tại thư mục gốc của ứng dụng, tạo file với tên .env (ko có phần mở rộng),
nội dung có thể tương tự như bên dưới
<!--
# Configuration for develoment environment

# Application Settings
APP_NAME="Shop-Backend"
APP_PORT=3000
APP_ENV=development
APP_DEBUG=true
APP_LOGGING=true
APP_TIMEZONE=UTC
APP_LOCALE=en

# Database Configuration
DB_TYPE=mssql # type in TypeOrmModule > useFactory throw an error ?? => dont know reason why!
DB_HOST="THIN19\SQL2016" # use double quote because of special character inside string (\)
DB_PORT=1433
DB_USER=sa # if set key is USERNAME, nestjs will get current OS user
DB_PASS=s@1234
DB_NAME=ShopData

# API Keys and Secrets
API_KEY=your_secret_api_key_here
JWT_SECRET='d9389834-5c98-4394-a08b-3ca360fc7443'
JWT_EXPIRE=60m # s=second, m=minute, h=hour, d=day
-->
(*) nhớ thêm [.env] vào file .gitignore, để khi push code lên github, nó sẽ bỏ qua file .env,
để tránh làm lộ các thông tin quan trọng như cấu hình db, hệ thống.

## tạo file cấu hình biến môi trường
trong thư mục [src], tạo thư mục [configs] (hoặc đặt tên gì gợi nhớ cũng đc).
trong thư mục [configs], tạo file [app.config.ts] & [db.config.ts].

file app.config.ts: dùng để lưu cấu hình của ứng dụng
file db.config.ts: dùng để lưu cấu hình database
(có thể viết chung 1 file cấu hình cũng đc, ko cần tách file như hd)

nội dung file [app.config.ts]
<!--
import * as process from 'node:process';
import { registerAs } from '@nestjs/config';
const appConfig = () => ({
    name: process.env.APP_NAME || 'Shop-backend',
    port: process.env.APP_PORT || 3000,
    env: process.env.APP_ENV || 'development', // 'production', //
    debug: process.env.APP_DEBUG === 'true',
    logging: process.env.APP_LOGGING === 'true',
    timezone: process.env.APP_TIMEZONE || 'UTC',
    locale: process.env.APP_LOCALE || 'en',
    jwtsecret: process.env.JWT_SECRET || 'd9389834-5c98-4394-a08b-3ca360fc7443',  // get here: https://www.uuidgenerator.net
    jwtexpire: process.env.JWT_EXPIRE || '60m', // s=second, m=minute, h=hour, d=day
});
export default registerAs('app', appConfig);
-->

nội dung file [db.config.ts]
<!--
import * as process from 'node:process';
import { registerAs } from '@nestjs/config';
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
export default registerAs('db', dbConfig);
-->
(*) các key theo sau [process.env.] chính là các key đã định nghĩa trong file [.env],
nếu trong file .env ko có những key này, thì sẽ trả về giá trị sau dấu [||] hoặc undifined

## cách load file cấu hình biến môi trường, hoặc file .env
sau khi cài đặt gói Configuration (@nestjs/config) do nestjs cung cấp,
ta sẽ nạp (load) tất cả cấu hình vào ứng dụng ở chế độ toàn cục (global),
để có thể truy cập các config ở bất kỳ đâu trong ứng dụng.

trong file [app.module.ts], trong phần [imports] thêm vào đoạn code sau
<!--
ConfigModule.forRoot({
    isGlobal: true,  // Makes config accessible throughout the application
    load:[appConfig, dbConfig],
}),
-->

import các thành phần cần thiết
<!--
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import appConfig from "./configs/app.config";
import dbConfig from "./configs/db.config";
-->

## cách đọc cấu hình
tại file module/controller/service cần lấy/đọc cấu hình,
trong hàm [constructor], thêm service của ConfigService
<!-- constructor(private readonly configService: ConfigService) {} -->

lấy/đọc cấu hình tương ứng với key đã định nghĩa
đọc trực tiếp từ file [.env] (cách A)
<!--
console.log('Host >>', this.configService.get<string>('DB_HOST'));
console.log('Port >>', this.configService.get<number>('DB_PORT'));
-->
(DB_HOST & DB_PORT là những key đã định nghĩa trong file .env)

đọc từ file [*.config.ts] (cách B)
<!--
console.log('Host >>', this.configService.get<string>('db.host'));
console.log('Port >>', this.configService.get<number>('db.port'));
-->
(host & port là những key đã định nghĩa trong file *.config.ts
tiền tố db là namespace đã export trong hàm registerAs)

## lưu ý quan trọng với file .env
tên file phải là [.env], nếu khác, nestjs sẽ ko hiểu.

phải đặt tại thư mục gốc của ứng dụng, nếu khác, ConfigService của nestjs sẽ ko có tác dụng

khi đọc file cấu hình theo (cách A), nếu muốn thay đổi cấu hình trong .env,
phải restart ứng dụng, nestjs mới hiểu cấu hình mới.

Khi đọc file cấu hình theo (cách B), thay đổi cấu hình trong file *.config.ts,
ko cần restart ứng dụng, mỗi lần lưu file, nestjs sẽ tự load cấu hình mới.



<!-- ##################################################################################################### -->

# A Step-by-Step Guide to Implement JWT Authentication in NestJS using Passport
https://medium.com/@camillefauchier/implementing-authentication-in-nestjs-using-passport-and-jwt-5a565aa521de