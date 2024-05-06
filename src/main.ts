import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const PORT = 3000;
  const DOMAIN = 'localhost';
  await app.listen(PORT);

  console.log(`✅ Server running at http://${DOMAIN}:${PORT}/`);
}
bootstrap();