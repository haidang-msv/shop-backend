import {
  Controller,
  Get,
} from '@nestjs/common';
import { MailService } from '@modules/mail/mail.service';
import { Public } from 'decorators/public.decorator';

@Controller('mail')
export class MailController {
  constructor(private readonly mailService: MailService) {}

  @Get()
  @Public()
  async sendMailTest() {
    this.mailService.sendActivationEmail('haidang@mankichi.net', 'msv-haidang', 'abc-123', '5 minutes');
    return 'send mail ok';
  }

}
