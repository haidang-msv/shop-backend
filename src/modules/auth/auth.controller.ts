import { BadRequestException, Body, Controller, Get, Post, Request, UseGuards } from '@nestjs/common';
import { AuthService } from '@modules/auth/auth.service';
import { LocalAuthGuard } from '@modules/auth/guards/local-auth.guard';
import { JwtAuthGuard } from '@modules/auth/guards/jwt-auth.guard';
import { Public } from '@modules/auth/decorators/public.decorator';
import { CreateUserDto } from '@modules/users/dto/create-user.dto';
import { clog } from '@helpers/utilities';

@Controller('auth')
export class AuthController {

  constructor(
    private readonly authService: AuthService,
  ) { }

  @Post('register')
  @Public()
  async register(@Body() userDto: CreateUserDto): Promise<any> {
    const ouput = await this.authService.registerUser(userDto);
    if (ouput === null) throw new BadRequestException('This email/username is exists');
    return ouput;
  }

  @Post('login')
  @Public()
  @UseGuards(LocalAuthGuard)
  async login(@Request() req): Promise<any> {
    clog('🗝️ >> after go to local.strategy.ts');
    /*
    đầu tiên, nest sẽ chạy vào local.strategy.ts,
    tìm và thực thi method validate, để thực hiện kiểm tra thông tin đăng nhập.
    nếu thông tin đăng nhập ko hợp lệ, sẽ return lỗi hoặc exception.
    ngược lại, sẽ gọi tiếp method handleLogin của AuthService, và tiến hành cấp access token thông qua jwt
    */
    return this.authService.handleLogin(req.user);
  }
  
  @Get('profile')
  @UseGuards(JwtAuthGuard)
  getProfile(@Request() req) {
    clog('🗝️ after go to jwt.strategy.ts');
    /*
    đầu tiên, nest sẽ chạy vào jwt.strategy.ts,
    tìm và thực thi method validate, để thực hiện verify token bằng cách:
    trích xuất BearerToken từ header của request,
    rồi giải mã và so sánh với secret key đã lưu trước đó.
    nếu token hợp lệ, sẽ giải mã payload và trả về dữ liệu.
    ngược lại, sẽ trả về exception Unauthorized 401
    */
    return this.authService.fetchProfile(req.user.email);
  }
}
