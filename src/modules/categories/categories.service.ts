import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { log } from 'node:console';

import { Categories } from "./categories.entity";
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { Database } from "@db/database.entity";
// import { HashService } from "@uti/hash.service";

@Injectable()
export class CategoriesService {
  constructor(
    @InjectRepository(Categories)
    private readonly categoriesRepo: Repository<Categories>,

    @InjectRepository(Database)
    private readonly dbRepo: Repository<Database>, //inject Entity vào Repository để gọi sp/fn thông qua repository

    // private readonly uti:UtilitiesService,
    // private readonly hashService:HashService,
  ){}

  // way to call mssql store procedure via typeorm in nestjs
  async fetchCategory(id:string):Promise<any>{
    let idNumber = parseInt(id);
    if(Number.isNaN(idNumber)) idNumber=-1;
    // this.uti.log('CategoriesService >> fetchCategory >> idNumber >>', idNumber);

    let sql = `exec sp_Categories_Load @CategoryId=${id}, @DirectChild=1, @Lang='E'`;
    // this.uti.log('CategoriesService >> fetchCategory >> sql >>', sql);

    // let r = await this.categoriesRepo.query(sql); /* hoặc:
    let command = 'exec sp_Categories_Load $1, $2, $3'
    let r = await this.dbRepo.query(sql, [idNumber, true, 'E']);
    //*/
    // this.uti.log('CategoriesService >> fetchCategory >> r >>', r);

    return r;
  }

  // create(createCategoryDto: CreateCategoryDto) {
  //   return 'This action adds a new category';
  // }

  findAll() {
    return `This action returns all categories`;
  }

  // findOne(id: number) {
  //   return `This action returns a #${id} category`;
  // }

  // update(id: number, updateCategoryDto: UpdateCategoryDto) {
  //   return `This action updates a #${id} category`;
  // }

  // remove(id: number) {
  //   return `This action removes a #${id} category`;
  // }


}
