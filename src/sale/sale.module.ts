import { Module } from '@nestjs/common';
import { SaleController } from './sale.controller';
import { PrismaModule } from 'src/prisma/prisma.module';
import { SaleService } from './sale.service';
import { MenuItemModule } from 'src/menu_item/menu_item.module';

@Module({
  imports: [PrismaModule, MenuItemModule],
  controllers: [SaleController],
  providers: [SaleService],
})
export class SaleModule {}
