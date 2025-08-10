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
    private dbRepo: Repository<Database>,
  ) { }

  async findAllUsers(): Promise<Users[]> {
    return this.usersRepo.find();
  }

  async findUserById(id: string): Promise<Users|null> {
    // console.log('👤 findUserById >> id >>', id);
    let idNumber = 0;
    if (!Number.isNaN(id)) idNumber = parseInt(id);
    // console.log('👤 findUserById >> idNumber >>', idNumber);
    const found = await this.usersRepo.findOneBy({ Id: idNumber });
    return found;
  }

  async findUserByEmail(email: string): Promise<Users|null> {
    // console.log('👤 findUserByEmail >> email >> ', email);
    if (email.trim() === '') return null;
    const found = await this.usersRepo.findOneBy({ Email: email });
    return found;
  }

  async createUser(userDto: CreateUserDto): Promise<any> {
    // console.log('👤 createUser >> userDto >>', userDto);
    const { Email, UserCode, UserPass } = userDto;
    const usr = this.usersRepo.create({
      Email,
      UserCode,
      UserPass
    });
    // console.log('👤 createUser >> usr >>', usr);
    const output = await this.usersRepo.save(usr);
    return {
      Email: output.Email,
      UserCode: output.UserCode
    };
  }

  async updateUser(id: string, userDto: UpdateUserDto): Promise<any> {
    try {
      const user = await this.findUserById(id);
      // console.log('👤 updateUser >> user >>', user);
      if (typeof user === 'undefined') return this.usersRepo.create({});

      const output = await this.usersRepo.update(id, userDto);
      // console.log('👤 updateUser >> output >>', output);

      return output;
    } catch (error) {
      console.error('🚧', error);
      return this.usersRepo.create({});
    }
  }

  // async findUserById2(id: string): Promise<Users> {
  //   let idNumber = 0;
  //   if(!Number.isNaN(id)) idNumber = parseInt(id);
  //   // console.log('👤 findUserById >> id >>', id);
  //   try {
  //     // const found = await this.usersRepo.findOne({ where: { Id: idNumber } });
  //     const found = await this.usersRepo.findOneBy({Id:idNumber});
  //     if (!found) {
  //       console.log('👤 findUserById >> not found user!');
  //       throw new NotFoundException(`User ["${id}"] not found!`);
  //     }
  //     return found;

  //     // const cmd = 'select * from Users where Id='+idNumber;
  //     // console.log('👤 findUserById >> cmd >>', cmd);
  //     // const found = await this.dbRepo.query(cmd);
  //     // return found;
  //   } catch (error) {
  //     console.error('🚧',error);
  //     return this.usersRepo.create({});
  //   }
  // }


}
