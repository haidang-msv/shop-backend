import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';

import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import appConfig from "./configs/app.config";
import dbConfig from "./configs/db.config";

import { UsersModule } from '@modules/users/users.module';
import { Users } from '@modules/users/users.entity';
import { RestaurantsModule } from '@modules/restaurants/restaurants.module';
import { Restaurants } from '@modules/restaurants/restaurants.entity';
import { CategoriesModule } from '@modules/categories/categories.module';
import { Categories } from '@modules/categories/categories.entity';
import { AuthModule } from '@modules/auth/auth.module';
import { APP_GUARD } from '@nestjs/core';
import { JwtAuthGuard } from '@modules/auth/guards/jwt-auth.guard';
import { MailerModule } from '@nestjs-modules/mailer';
import { HandlebarsAdapter } from '@nestjs-modules/mailer/dist/adapters/handlebars.adapter';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,  // Makes config accessible throughout the application
      load:[appConfig, dbConfig],
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule], // Import ConfigModule to make ConfigService available
      inject: [ConfigService], // Inject ConfigService into the factory function
      useFactory: (configService: ConfigService) => ({
        name: 'mainDB', // Unique name
        type: 'mssql',
        // type: configService.get<string>('db.type'), // ?? => i dont know reason why
        host: configService.get<string>('db.host'),
        port: configService.get<number>('db.port'),
        username: configService.get<string>('db.user'),
        password: configService.get<string>('db.pass'),
        database: configService.get<string>('db.name'),
        options: {
          // encrypt: false, // MSSQL-specific option
          encrypt: configService.get<boolean>('db.options.encrypt'),
        },
        synchronize: false, // true: use this with development enviroment
        entities: [Users, Restaurants, Categories]
      }),
    }),
    // TypeOrmModule.forRootAsync({
    //   imports: [ConfigModule], // Import ConfigModule to make ConfigService available
    //   inject: [ConfigService], // Inject ConfigService into the factory function
    //   useFactory: (configService: ConfigService) => ({
    //     name: 'mainDB', // Unique name
    //     type: 'mssql',
    //     // type: configService.get<string>('DB_TYPE'), // ?? => i dont know reason why
    //     host: configService.get<string>('DB_HOST','localhost'), // use "localhost" when "DB_HOST" is not defined
    //     port: configService.get<number>('DB_PORT', 1433), // use 1433 when DB_HOST is not defined
    //     username: configService.get<string>('DB_USER'),
    //     password: configService.get<string>('DB_PASS'),
    //     database: configService.get<string>('DB_NAME'),
    //     options: {
    //       encrypt: false, // MSSQL-specific option
    //     },
    //     synchronize: false, // true: use this with development enviroment
    //     // entities: [UsersEntity, RestaurantsEntity, CategoriesEntity],
    //     entities: [__dirname + '/*.entity{.ts,.js}'], // load all of entity file in [dirname] module without import Entity Class
    //   }),
    // }),
    // TypeOrmModule.forRootAsync({
    //   imports: [ConfigModule], // Import ConfigModule to make ConfigService available
    //   inject: [ConfigService], // Inject ConfigService into the factory function
    //   useFactory: (configService: ConfigService) => ({
    //     name: 'mainDB', // Unique name
    //     type: 'mssql',
    //     host: 'THIN19\\SQL2016',
    //     port: 1433,
    //     username: 'sa',
    //     password: 's@1234',
    //     database: 'ShopData',
    //     options: {
    //       encrypt: false, // MSSQL-specific option
    //     },
    //     synchronize: false, // true: use this with development enviroment
    //     // entities: [UsersEntity, RestaurantsEntity, CategoriesEntity],
    //     entities: [__dirname + '/*.entity{.ts,.js}'], // load all of entity file in [dirname] module without import Entity Class
    //   }),
    // }),
    // secondary db connection (if have)
    // TypeOrmModule.forRootAsync({
    //   imports: [ConfigModule],
    //   inject: [ConfigService],
    //   name: 'secondaryDB', // Unique name
    //   useFactory: async (configService: ConfigService) => {
    //     return {
    //       type: 'mssql',
    //       host: configService.get<string>('SECONDARY_DB_HOST'),
    //       port: configService.get<number>('SECONDARY_DB_PORT', 1433),
    //       username: configService.get<string>('SECONDARY_DB_USER'),
    //       password: configService.get<string>('SECONDARY_DB_PASS'),
    //       database: configService.get<string>('SECONDARY_DB_NAME'),
    //       options: {
    //         encrypt: false, // MSSQL-specific option
    //       },
    //       entities: [AccessLogEntity],
    //     };
    //   },
    // }),
    MailerModule.forRootAsync({
     imports: [ConfigModule],
     inject: [ConfigService],
     useFactory: async (config:ConfigService) => ({
      transport: {
            host: 'smtp.gmail.com',
            port: 465, // Use 587 for TLS, 465 for SSL
            secure: true, // Use 'true' if port is 465 (SSL), 'false' if port is 587 (TLS)
            auth: {
              user: config.get<string>('app.mailuser'), // Your Gmail address
              pass: config.get<string>('app.mailpass'), // Your generated App Password
            },
      },
      template: {
        dir: process.cwd() + '/src/templates/mail/', // đường dẫn đến file template. cwd()=current work directory
        adapter: new HandlebarsAdapter(), // or new PugAdapter() or new EjsAdapter()
        options: {
          strict: true,
        },
      },
      defaults: {
       from: '"No Reply" <no-reply@localhost>',
      },
      //preview: true,
     }),
    }),
    AuthModule,
    UsersModule,
    RestaurantsModule,
    CategoriesModule,
  ],
  controllers: [AppController],
  providers: [
    AppService,
    ConfigService,
    {
      provide: APP_GUARD,
      useClass: JwtAuthGuard
    }
  ],
})
export class AppModule {
  constructor(private readonly configService: ConfigService) {
    // console.log('AppModule >> get environment variable from .env file:');
    // console.log('AppModule >> Type >>', this.configService.get<string>('DB_TYPE'));
    // console.log('AppModule >> Host >>', this.configService.get<string>('DB_HOST'));
    // console.log('AppModule >> Port >>', this.configService.get<number>('DB_PORT'));
    // console.log('AppModule >> Username >>', this.configService.get<string>('DB_USER'));
    // console.log('AppModule >> Password >>', this.configService.get<string>('DB_PASS'));
    // console.log('AppModule >> Database >>', this.configService.get<string>('DB_NAME'));
    
    // console.log('AppModule >> get environment variable from .config file:');
    // console.log('AppModule >> Type >>', this.configService.get<string>('db.type'));
    // console.log('AppModule >> Host >>', this.configService.get<string>('db.host'));
    // console.log('AppModule >> Port >>', this.configService.get<number>('db.port'));
    // console.log('AppModule >> User >>', this.configService.get<string>('db.user'));
    // console.log('AppModule >> Pass >>', this.configService.get<string>('db.pass'));
    // console.log('AppModule >> Name >>', this.configService.get<string>('db.name'));

    // console.log('AppModule >> App port >>', this.configService.get<string>('app.port'));
  }
}
