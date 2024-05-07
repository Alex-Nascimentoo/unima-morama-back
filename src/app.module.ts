import { Module } from '@nestjs/common';
import { ClientModule } from './client/client.module';
import { PrismaModule } from './prisma/prisma.module';

@Module({
  imports: [ClientModule, PrismaModule]
})
export class AppModule {}
