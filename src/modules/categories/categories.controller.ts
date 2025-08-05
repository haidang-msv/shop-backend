import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { CategoriesService } from './categories.service';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { DatabaseService } from '@db/database.service';

@Controller('categories')
export class CategoriesController {
  constructor(
    private readonly catService: CategoriesService,
    private readonly dbService: DatabaseService,
  ) {}

  // @Post()
  // create(@Body() createCategoryDto: CreateCategoryDto) {
  //   return this.catService.create(createCategoryDto);
  // }

  @Get()
  findAll() {
    // return this.catService.findAll();
    // return this.dbService.callStoredProcedureWithRepo('0', true);
    return this.catService.findAll();
  }  

  @Get(':id')
  fetchCategory(@Param('id') id:string){
    return this.catService.fetchCategory(id);
  }

  // @Get(':id')
  // findOne(@Param('id') id: string) {
  //   return this.catService.findOne(+id);
  // }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateCategoryDto: UpdateCategoryDto) {
    return this.catService.update(+id, updateCategoryDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.catService.remove(+id);
  }
}
