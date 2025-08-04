import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';

import { UsersModule } from './modules/users/users.module';
import { UsersEntity } from './modules/users/users.entity';

import { RestaurantsModule } from './modules/restaurants/restaurants.module';
import { RestaurantsEntity } from './modules/restaurants/restaurants.entity';

import { CategoriesModule } from './modules/categories/categories.module';
import { CategoriesEntity } from "./modules/categories/categories.entity";

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mssql',
      host: 'THIN19\\SQL2016',
      port: 1433,
      username: 'sa',
      password: 's@1234',
      database: 'ShopData',
      options: {
        encrypt: false, // MSSQL-specific option
      },
      // synchronize: true, //use this with development enviroment
      entities: [UsersEntity, RestaurantsEntity, CategoriesEntity],
    }),
    UsersModule,
    RestaurantsModule,
    CategoriesModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
