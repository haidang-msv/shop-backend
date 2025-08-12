import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

import { CreateUserDto } from '@modules/users/dto/create-user.dto';
import { UsersService } from '@modules/users/users.service';
import { compareHashed, hashText } from '@helpers/utilities';
import { Users } from '@modules/users/users.entity';

@Injectable()
export class AuthService {
  constructor(
    private readonly jwtService: JwtService,
    private readonly usersService: UsersService,
  ) {}

  async registerUser(user: CreateUserDto): Promise<any> {
    return await this.usersService.createUser(user);
  }

  async validateUser(code: string, pass: string): Promise<any> {
    let user = await this.usersService.findUserByEmail(code);
    if (!user) user = await this.usersService.findUserByUserCode(code);
    if (!user) return null;
    const isMatch = await compareHashed(pass, user.UserPass);
    if (isMatch) return user;
    return null;
  }

  async handleLogin(user: Users): Promise<any> {
    const payload = { username: user.Email, sub: user.UserCode };
    const accessToken = this.jwtService.sign(payload); // issue access token
    return {
      access_token: accessToken,
    };
  }

  async fetchProfile(data:string):Promise<any|null>{
    let user = await this.usersService.findUserByUserCode(data);
    if(!user) user = await this.usersService.findUserByEmail(data);
    if(!user) return null;
    return {
      Email: user.Email,
      UserCode: user.UserCode,
      UserRole:user.UserRole,
    }
  }

  
}
