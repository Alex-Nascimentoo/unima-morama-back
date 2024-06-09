import { Module } from '@nestjs/common';
import { MenuItemController } from './menu_item.controller';
import { MenuItemService } from './menu_item.service';
import { PrismaModule } from 'src/prisma/prisma.module';

@Module({
  imports: [PrismaModule],
  controllers: [MenuItemController],
  providers: [MenuItemService]
})
export class MenuItemModule {}
