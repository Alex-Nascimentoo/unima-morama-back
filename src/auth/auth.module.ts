import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { ClientModule } from 'src/client/client.module';
import { JwtModule } from '@nestjs/jwt';
import { APP_GUARD } from '@nestjs/core';
import { JWTAuth } from './auth.guard';

@Module({
  imports: [
    ClientModule,
    JwtModule.register({
      global: true,
      secret: process.env.JWT_SECRET_KEY,
      signOptions: { expiresIn: '60s' },
    }),
  ],
  providers: [AuthService, { provide: APP_GUARD, useClass: JWTAuth }],
  controllers: [AuthController],
  exports: [AuthService]
})
export class AuthModule {}
