import { Module } from '@nestjs/common';
import { IngredientOrderService } from './ingredient_order.service';
import { IngredientOrderController } from './ingredient_order.controller';
import { PrismaModule } from 'src/prisma/prisma.module';
import { IngredientModule } from 'src/ingredient/ingredient.module';
import { UtilsModule } from 'src/utils/utils.module';

@Module({
  imports: [PrismaModule, IngredientModule, UtilsModule],
  providers: [IngredientOrderService],
  controllers: [IngredientOrderController]
})
export class IngredientOrderModule {}
