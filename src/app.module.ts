import { Module } from '@nestjs/common';
import { ClientModule } from './client/client.module';
import { PrismaModule } from './prisma/prisma.module';
import { AuthModule } from './auth/auth.module';
import { ConfigModule } from '@nestjs/config';
import { SupplierController } from './supplier/supplier.controller';
import { SupplierModule } from './supplier/supplier.module';

@Module({
  imports: [
    ConfigModule.forRoot( { isGlobal: true } ),
    ClientModule, 
    PrismaModule, 
    AuthModule,
    SupplierModule
  ],
})
export class AppModule {}
