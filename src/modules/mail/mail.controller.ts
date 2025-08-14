import { Body, Controller, Get, Post } from '@nestjs/common';
import { MailService } from '@modules/mail/mail.service';
import { Public } from 'decorators/public.decorator';
import validator from 'validator';

@Controller('mail')
export class MailController {
  constructor(private readonly mailService: MailService) {}

  // @Get()
  // @Public()
  // async sendMailTest() {
  //   this.mailService.sendActivationEmail(
  //     'haidang@mankichi.net',
  //     'msv-haidang',
  //     'abc-123',
  //     '5 minutes',
  //   );
  //   return 'send mail ok';
  // }

  @Post()
  @Public()
  async sendMailTestTo(@Body() body: any) {
    const mailAddress = body.email;
    const name = body.name ?? 'Anonymous';
    if (typeof mailAddress === 'undefined')
      return { msg: 'email address must not be empty' };
    if (!validator.isEmail(mailAddress))
      return { msg: 'email address is not valid' };
    this.mailService.sendActivationEmail(
      mailAddress,
      name,
      'abc-123',
      '5 minutes',
    );
    return { msg: 'send mail ok' };
  }
}
