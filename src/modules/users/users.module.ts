import { Module } from '@nestjs/common';
import { UsersService } from '@modules/users/users.service';
import { UsersController } from '@modules/users/users.controller';

import { TypeOrmModule } from '@nestjs/typeorm';
import { Users } from '@modules/users/users.entity';
import { Database } from '@modules/database/database.entity';
import { MailService } from '@modules/mail/mail.service';

@Module({
  imports: [TypeOrmModule.forFeature([Users, Database])],
  controllers: [UsersController],
  providers: [UsersService, MailService],
  exports: [UsersService],
})
export class UsersModule {}
