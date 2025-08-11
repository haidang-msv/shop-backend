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
npm i reflect-metadata # (0.2.2)
npm i @types/node <!-- gói type definitions cho thư viện node (24.2.1) hỗ trợ khi viết mã TypeScript -->
npm i -g ts-node <!-- để có thể thao tác trực tiếp code TypeScript trên Node mà ko cần biên dịch trước (10.9.2) -->

# cài đặt driver csdl để sử dụng với typeorm (https://typeorm.io/docs/getting-started)
# TypeORM hỗ trợ nhiều hệ quản trị csdl phổ biến như MySQL, PostgreSQL, MariaDB, SQLite, MS SQL Server, Oracle, SAP Hana...
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
# @nestjs/passport: thư viện các phương thức/properties thao tác với passport
# passport-local: module xác thực username & password cục bộ trong ứng dụng
# @types/passport-local: gói type definitions cho thư viện passport-local hỗ trợ khi viết mã TypeScript
npm i passport @nestjs/passport passport-local
npm i @types/passport-local
<!-- npm i --exact passport@0.7.0 @nestjs/passport@11.0.5 passport-local@1.0.0 -->
<!-- npm i --exact @types/passport-local@1.0.38 -->

## cài đặt gói jwt (Json Web Token)
# @nestjs/jwt:  gói tiện ích hỗ trợ thao tác JWT
# passport-jwt: dùng để triển khai chiến lược JWT
# @types/passport-jwt: cung cấp các định nghĩa kiểu TypeScript.
npm i @nestjs/jwt passport-jwt
npm i @types/passport-jwt
<!-- npm i --exact @nestjs/jwt@11.0.0 passport-jwt@4.0.1 -->
<!-- npm i --exact @types/passport-jwt@4.0.1 -->

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

# A Step-by-Step Guide to Implement JWT Authentication in NestJS using Passport
https://medium.com/@camillefauchier/implementing-authentication-in-nestjs-using-passport-and-jwt-5a565aa521de