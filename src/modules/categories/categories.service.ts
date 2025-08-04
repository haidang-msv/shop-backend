import { Injectable } from '@nestjs/common';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';

import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CategoriesEntity } from "./categories.entity";
import { log } from 'console';

@Injectable()
export class CategoriesService {
  constructor(@InjectRepository(CategoriesEntity) private readonly categoriesRepo: Repository<CategoriesEntity>){}

  // way to call mssql store procedure via typeorm in nestjs
  async fetchCategory(id:string):Promise<any>{
    let idNumber = parseInt(id);
    if(Number.isNaN(idNumber)) idNumber=-1;
    log('CategoriesService >> fetchCategory >> idNumber >>', idNumber);

    let sql = `exec sp_Categories_Load @CategoryId=${id}, @DirectChild=1, @Lang='E'`;
    console.log('CategoriesService >> fetchCategory >> sql >>', sql);

    let r = await this.categoriesRepo.query(sql);
    console.log('CategoriesService >> fetchCategory >> r >>', r);

    return r;
  }

  create(createCategoryDto: CreateCategoryDto) {
    return 'This action adds a new category';
  }

  findAll() {
    return `This action returns all categories`;
  }

  findOne(id: number) {
    return `This action returns a #${id} category`;
  }

  update(id: number, updateCategoryDto: UpdateCategoryDto) {
    return `This action updates a #${id} category`;
  }

  remove(id: number) {
    return `This action removes a #${id} category`;
  }
}
