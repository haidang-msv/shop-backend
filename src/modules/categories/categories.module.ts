import { Module } from '@nestjs/common';
import { CategoriesService } from './categories.service';
import { CategoriesController } from './categories.controller';

import { TypeOrmModule } from '@nestjs/typeorm';
import { Categories } from "./categories.entity";
import { DatabaseService } from '@db/database.service';
import { Database } from '@db/database.entity';
import { UtilitiesService, HashService } from "@uti/utilities.service";

@Module({
  imports:[TypeOrmModule.forFeature([Categories,Database])],
  controllers: [CategoriesController],
  providers: [CategoriesService, DatabaseService, UtilitiesService, HashService],
})
export class CategoriesModule {}
