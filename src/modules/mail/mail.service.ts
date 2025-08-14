import { Injectable } from '@nestjs/common';
import { MailerService } from '@nestjs-modules/mailer';
import { SentMessageInfo } from 'nodemailer';
import { clog } from '@helpers/utilities';

@Injectable()
export class MailService {
    constructor(
        private readonly mailerService: MailerService
    ) { }

    async sendActivationEmail(to: string, name: string, code: string, expire: string) {
        const sentInfo: SentMessageInfo =
        // await // gửi mail bất đồng bộ, nên ko sử dụng await
        // await // nếu muốn xem kq gửi mail ở dòng clog thì phải có await
        this.mailerService.sendMail({
            to: to,
            // cc: [],
            // bcc: [],
            subject: 'Activate your account 🔑',
            template: 'register', // 👈 tên file template Handlebars (hoặc register.hbs)
            context: {
                name: name, // 👈 name: key trong template, dạng {{name}}
                activationCode: code, // 👈 activationCode: key trong template, dạng {{activationCode}}
                expiredTime: expire // 👈 expiredTime: key trong template, dạng {{expiredTime}}
            },
        });
        // clog('📧  sendActivationEmail >> sentInfo >>', sentInfo);
    }

}