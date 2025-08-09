import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
// import { UsersEntity } from './users.entity';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get()
  getAllUsers() {
    // return this.usersService.findAllUsers();
    return 'Only get 1 user everytimes';
  }

  @Get(':id')
  getOneUser(@Param('id') id: string) {
    return this.usersService.findUserById(id);
  }

  @Post()
  addNewUser(@Body() userDto: CreateUserDto) {
    console.log('🧩 addNewUser >> userDto >>', userDto); // nếu truyền những properties ko có trong dto, thì nest sẽ bỏ qua chúng, chỉ lấy đúng các props trong dto
    return this.usersService.createUser(userDto);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.usersService.updateUser(id, updateUserDto);
  }

  // @Delete(':id')
  // remove(@Param('id') id: string) {
  //   return this.usersService.remove(+id);
  // }
}
