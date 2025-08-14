import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { HandlebarsAdapter } from '@nestjs-modules/mailer/dist/adapters/handlebars.adapter';
import { MailService } from './mail.service';
import { MailerModule } from '@nestjs-modules/mailer';
import { MailController } from '@modules/mail/mail.controller';

@Module({
  imports: [
    MailerModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (config: ConfigService) => ({
        transport: {
          host: 'smtp.gmail.com',
          port: 465, // Use 587 for TLS, 465 for SSL
          secure: true, // Use 'true' if port is 465 (SSL), 'false' if port is 587 (TLS)
          auth: {
            user: config.get<string>('app.mailuser'), // Your Gmail address
            pass: config.get<string>('app.mailpass'), // Your generated App Password
          },
        },
        template: {
          dir: process.cwd() + '/src/modules/mail/templates/', // đường dẫn đến file template. cwd()=current work directory
          adapter: new HandlebarsAdapter(), // hoặc new PugAdapter(), hoặc new EjsAdapter()
          options: {
            strict: true,
          },
        },
        defaults: {
          from: '"No Reply" <no-reply@localhost>',
        },
        //preview: true,
      }),
    }),
  ],
  controllers:[MailController],
  providers: [MailService],
  exports: [MailService], // 👈 export for DI (Dependency Injection) to import at AppModule
})
export class MailModule {}
