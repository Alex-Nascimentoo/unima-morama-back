import { Module } from '@nestjs/common';
import { ClientModule } from './client/client.module';
import { PrismaModule } from './prisma/prisma.module';
import { AuthModule } from './auth/auth.module';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    ClientModule, 
    PrismaModule, 
    AuthModule,
    ConfigModule.forRoot( { isGlobal: true } )
  ]
})
export class AppModule {}
