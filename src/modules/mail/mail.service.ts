import { Injectable } from '@nestjs/common';
import { MailerService } from '@nestjs-modules/mailer';

@Injectable()
export class MailService {
    constructor(
        private readonly mailerService: MailerService
    ) { }

    async sendActivationEmail(to: string, name: string, code: string) {
        // await // gửi mail bất đồng bộ, nên ko sử dụng await
        this.mailerService.sendMail({
            to: to,
            subject: 'Activate your account 🔑',
            template: 'register', // Name of your Handlebars template file (e.g., welcome.hbs)
            context: {
                name: name,
                activationCode: code
            },
        });
    }

}