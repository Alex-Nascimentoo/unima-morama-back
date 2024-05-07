import { Module, ValidationPipe } from '@nestjs/common';
import { ClientModule } from './client/client.module';
import { APP_PIPE } from '@nestjs/core';

@Module({
  imports: [ClientModule],
  controllers: [],
  providers: [
    {
      provide: APP_PIPE,
      useClass: ValidationPipe
    }
  ],
})
export class AppModule {}
