import { BadRequestException, Body, Controller, Post, Request } from '@nestjs/common';
import { AuthService } from './auth.service';
import { UsersService } from '@modules/users/users.service';
import { CreateUserDto } from '@modules/users/dto/create-user.dto';

@Controller('auth')
export class AuthController {

  constructor(
    private readonly authService: AuthService,
    private userService: UsersService,
  ) { }

  @Post('register')
  async register(@Body() user: CreateUserDto): Promise<any> {
    const ouput = this.authService.registerUser(user);
    if (ouput === null) throw new BadRequestException('This email is exists');
    return ouput;
  }

  @Post('login')
  async login(@Request() req): Promise<any> {

   }
}
