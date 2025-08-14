import { Injectable } from '@nestjs/common';
import { MailerService } from '@nestjs-modules/mailer';

@Injectable()
export class MailService {
    constructor(
        private readonly mailerService: MailerService
    ) { }

    async sendActivationEmail(to: string, name: string, code: string, expire: string) {
        // await // gửi mail bất đồng bộ, nên ko sử dụng await
        this.mailerService.sendMail({
            to: to,
            subject: 'Activate your account 🔑',
            template: 'register', // 👈 tên file template Handlebars (hoặc register.hbs)
            context: {
                name: name, // 👈 name: key trong template, dạng {{name}}
                activationCode: code, // 👈 activationCode: key trong template, dạng {{activationCode}}
                expiredTime: expire // 👈 expiredTime: key trong template, dạng {{expiredTime}}
            },
        });
    }

}