import { Module } from '@nestjs/common';
import { ClientModule } from './client/client.module';
import { PrismaModule } from './prisma/prisma.module';
import { AuthModule } from './auth/auth.module';
import { ConfigModule } from '@nestjs/config';
import { SupplierController } from './supplier/supplier.controller';
import { SupplierModule } from './supplier/supplier.module';
import { IngredientModule } from './ingredient/ingredient.module';
import { IngredientOrderModule } from './ingredient_order/ingredient_order.module';

@Module({
  imports: [
    ConfigModule.forRoot( { isGlobal: true } ),
    ClientModule, 
    PrismaModule, 
    AuthModule,
    SupplierModule,
    IngredientModule,
    IngredientOrderModule
  ],
})
export class AppModule {}
