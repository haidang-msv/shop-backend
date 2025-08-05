import { Injectable } from '@nestjs/common';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';

import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CategoriesEntity } from "./categories.entity";
import { log } from 'console';

import { DatabaseEntity } from "@db/database.entity";
import { UtilitiesService, HashService } from "@uti/utilities.service";
// import { HashService } from "@uti/hash.service";

@Injectable()
export class CategoriesService {
  constructor(
    @InjectRepository(CategoriesEntity)
    private readonly categoriesRepo: Repository<CategoriesEntity>,

    @InjectRepository(DatabaseEntity)
    private readonly dbRepo: Repository<DatabaseEntity>, //inject Entity vào Repository để gọi sp/fn thông qua repository

    private readonly utiService:UtilitiesService,
    private readonly hashService:HashService,
  ){}

  // way to call mssql store procedure via typeorm in nestjs
  async fetchCategory(id:string):Promise<any>{
    let idNumber = parseInt(id);
    if(Number.isNaN(idNumber)) idNumber=-1;
    // log('CategoriesService >> fetchCategory >> idNumber >>', idNumber);

    let sql = `exec sp_Categories_Load @CategoryId=${id}, @DirectChild=1, @Lang='E'`;
    // log('CategoriesService >> fetchCategory >> sql >>', sql);

    // let r = await this.categoriesRepo.query(sql); /* hoặc:
    let command = 'exec sp_Categories_Load $1, $2, $3'
    let r = await this.dbRepo.query(sql, [idNumber, true, 'E']);
    //*/
    // log('CategoriesService >> fetchCategory >> r >>', r);

    return r;
  }

  // create(createCategoryDto: CreateCategoryDto) {
  //   return 'This action adds a new category';
  // }

  findAll() {
    // return `This action returns all categories`;

    const xmlString = `<root><item id="1">Value 1</item><item id="2">Value 2</item></root>`;
    try {
      const jsonObj = this.utiService.xmlToJson(xmlString);
      // log('CategoriesService >> jsonObj >>', jsonObj);
    } catch (error) {
      log('CategoriesService >> error >>',error);
    }

    const jsonObject = {
        name: 'Product',
        id: '123',
        details: {
            price: 29.99,
            currency: 'USD'
        },
        tags: ['electronics', 'gadget']
    };
    try {
      const xmlStr = this.utiService.jsonToXml(jsonObject);
      // log('CategoriesService >> xmlStr >>', xmlStr);
    } catch (error) {
      log('CategoriesService >> error >>',error);
    }

    log('hashService >> md5 >>', this.hashService.generateMd5('abc'));
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
