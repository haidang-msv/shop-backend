import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { Users } from '@modules/users/users.entity';
import { Database } from '@modules/database/database.entity';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(Users)
    private usersRepo: Repository<Users>,

    @InjectRepository(Database)
    private dbRepo:Repository<Database>,
  ) {}

  async findAllUsers(): Promise<Users[]> {
    return this.usersRepo.find();
  }

  async findUserById(id: string): Promise<Users> {
    let idNumber = 0;
    if(!Number.isNaN(id)) idNumber = parseInt(id);
    // console.log('🧩 findUserById >> id >>', id);
    try {
      // const found = await this.usersRepo.findOne({ where: { Id: idNumber } });
      const found = await this.usersRepo.findOneBy({Id:idNumber});
      if (!found) {
        console.log('🧩 findUserById >> not found user!');
        throw new NotFoundException(`User ["${id}"] not found!`);
      }
      return found;

      // const cmd = 'select * from Users where Id='+idNumber;
      // console.log('🧩 findUserById >> cmd >>', cmd);
      // const found = await this.dbRepo.query(cmd);
      // return found;
    } catch (error) {
      console.error('🚧',error);
      return this.usersRepo.create({});
    }
  }
  
  async createUser(userDto: CreateUserDto): Promise<any> {
    // console.log('🧩 createUser >> userDto >>', userDto);
    const { Email, UserCode, UserPass } = userDto;
    const usr = this.usersRepo.create({
      Email,
      UserCode,
      UserPass
    });
    // console.log('🧩 createUser >> usr >>', usr);
    const output = await this.usersRepo.save(usr);
    return {
      Email: output.Email,
      UserCode: output.UserCode
    };
  }

  async updateUser(id: string, userDto: UpdateUserDto): Promise<any> {
    try {
      const user = await this.findUserById(id);
      console.log('🧩 findUser >> user >>', user);
      if (typeof user === 'undefined') return this.usersRepo.create({});
      
      const output = await this.usersRepo.update(id, userDto);
      console.log('🧩 findUser >> user >>', user);

      return output;
    } catch (error) {
      console.error('🚧',error);
      return this.usersRepo.create({});      
    }
  }

  // remove(id: number) {
  //   return `This action removes a #${id} user`;
  // }

  // findAll() {
  //   return `This action returns all users`;
  // }

  // async findUser(id: number):Promise<Users> {
  //   const user = await this.userModel.findById(id);
  //   if (!user) throw new NotFoundException('could not find the user');
  //   return user;
  // }

}
