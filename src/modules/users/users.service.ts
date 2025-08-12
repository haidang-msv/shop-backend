import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import dayjs from 'dayjs'
import { v4 as uuidv4 } from 'uuid';

import { Users } from '@modules/users/users.entity';
import { Database } from '@modules/database/database.entity';
import { CreateUserDto } from '@modules/users/dto/create-user.dto';
import { UpdateUserDto } from '@modules/users/dto/update-user.dto';
import { clog, hashText } from '@helpers/utilities';
import { MailService } from '@modules/mail/mail.service';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(Users)
    private usersRepo: Repository<Users>,

    @InjectRepository(Database)
    private dbRepo: Repository<Database>,

    private readonly mailService:MailService,
  ) { }

  async findAllUsers(): Promise<Users[]> {
    return this.usersRepo.find();
  }

  async findUserById(id: string): Promise<Users|null> {
    // clog('👤 findUserById >> id >>', id);
    let idNumber = 0;
    if (!Number.isNaN(id)) idNumber = parseInt(id);
    // clog('👤 findUserById >> idNumber >>', idNumber);
    const found = await this.usersRepo.findOneBy({ Id: idNumber });
    return found;
  }

  async findUserByEmail(email: string): Promise<Users|null> {
    // clog('👤 findUserByEmail >> email >> ', email);
    const data = email.trim();
    if (data === '') return null;
    const found = await this.usersRepo.findOneBy({ Email: data });
    return found;
  }

  async findUserByUserCode(code: string): Promise<Users|null> {
    // clog('👤 findUserByUserCode >> code >> ', code);
    const data = code.trim();
    if (data === '') return null;
    const found = await this.usersRepo.findOneBy({ UserCode: data });
    return found;
  }

  async createUser(userDto: CreateUserDto): Promise<any|null> {
    // clog('👤 createUser >> userDto >>', userDto);
    const { Email, UserCode, UserPass } = userDto;
    
    let u = await this.findUserByEmail(Email);
    if(u != null) return null;
    
    u = await this.findUserByUserCode(UserCode);
    if(u != null) return null;

    const hashedPassword = await hashText(UserPass);
    const usr = this.usersRepo.create({
      Email,
      UserCode,
      UserPass:hashedPassword,
      IsActive:false,
      ActiveCode:uuidv4(),
      ExpiredCode:dayjs().add(1, 'year'),
    });
    
    // save new user
    // clog('👤 createUser >> usr >>', usr);
    const output = await this.usersRepo.save(usr);
    
    // send activation mail
    this.mailService.sendActivationEmail(output.Email, output.Fullname, output.ActiveCode);

    // return result after create new user
    return {
      Email: output.Email,
      UserCode: output.UserCode,
      ActiveCode: output.ActiveCode,
    };
  }

  async activateUser(){
    try {
      
    } catch (error) {
      clog('👤 activateUser >> error >>', error)
    }
  }

  async updateUser(id: string, userDto: UpdateUserDto): Promise<any> {
    try {
      const user = await this.findUserById(id);
      // clog('👤 updateUser >> user >>', user);
      if (typeof user === 'undefined') return this.usersRepo.create({});

      const output = await this.usersRepo.update(id, userDto);
      // clog('👤 updateUser >> output >>', output);

      return output;
    } catch (error) {
      console.error('🚧', error);
      return this.usersRepo.create({});
    }
  }

  // async findUserById2(id: string): Promise<Users> {
  //   let idNumber = 0;
  //   if(!Number.isNaN(id)) idNumber = parseInt(id);
  //   // clog('👤 findUserById >> id >>', id);
  //   try {
  //     // const found = await this.usersRepo.findOne({ where: { Id: idNumber } });
  //     const found = await this.usersRepo.findOneBy({Id:idNumber});
  //     if (!found) {
  //       clog('👤 findUserById >> not found user!');
  //       throw new NotFoundException(`User ["${id}"] not found!`);
  //     }
  //     return found;

  //     // const cmd = 'select * from Users where Id='+idNumber;
  //     // clog('👤 findUserById >> cmd >>', cmd);
  //     // const found = await this.dbRepo.query(cmd);
  //     // return found;
  //   } catch (error) {
  //     console.error('🚧',error);
  //     return this.usersRepo.create({});
  //   }
  // }


}
