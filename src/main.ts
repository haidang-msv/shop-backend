import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ConfigService } from '@nestjs/config';
import { ValidationPipe } from '@nestjs/common';
import { log } from 'node:console';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Set global prefix & exclude special path
  // app.setGlobalPrefix('/api/v1', { exclude: ['', 'bhd'] });

  // Retrieve ConfigService instance
  const configService = app.get(ConfigService);

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true, // bỏ qua (ko validate) những properties ko có trong dto
      // skipMissingProperties: true, // bỏ qua (ko validate) những properties truyền vào mà có giá trị undefined/null hoặc không tồn tại
    }),
  );

  // Access configuration values
  // let port = configService.get<number>('APP_PORT'); // get from .env file
  let port = configService.get<number>('app.port'); // get from .config file
  port = port  ?? 3030;

  await app.listen(port); // Use config value or default
  log('shop-backend server is listening at port: ', port);
}
bootstrap();
