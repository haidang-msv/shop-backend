import { CreateUserDto } from '@modules/users/dto/create-user.dto';
import { UsersService } from '@modules/users/users.service';
import { Injectable } from '@nestjs/common';
import { hashText } from 'helper/utilities';

@Injectable()
export class AuthService {
    constructor(
        private readonly userService:UsersService
    ){}

    async registerUser(user:CreateUserDto):Promise<any>{
        const isExisted = this.userService.findUserByEmail(user.Email) != null;
        if (isExisted) return null;
    
        // user.UserPass = generateSha256(user.UserPass);
        user.UserPass = await hashText(user.UserPass);
        return this.userService.createUser(user);
    }

    async handleLogin():Promise<any>{}
}
