import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const PORT = 3000;
  const DOMAIN = 'localhost';
  app.useGlobalPipes( new ValidationPipe(
    {
      transform:true,
      whitelist: true,
      forbidNonWhitelisted: true
    }
  ));
  
  await app.listen(PORT);
  console.log(`✅ Server running at http://${DOMAIN}:${PORT}/`);
}
bootstrap();