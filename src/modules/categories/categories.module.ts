import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { CategoriesService } from '@modules/categories/categories.service';
import { CategoriesController } from '@modules/categories/categories.controller';
import { Categories } from "@modules/categories/categories.entity";
import { DatabaseService } from '@modules/database/database.service';
import { Database } from '@modules/database/database.entity';

@Module({
  imports:[TypeOrmModule.forFeature([Categories,Database])],
  controllers: [CategoriesController],
  providers: [CategoriesService, DatabaseService],
})
export class CategoriesModule {}
