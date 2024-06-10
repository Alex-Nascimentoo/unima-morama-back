import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Post,
} from '@nestjs/common';
import { MenuItemService } from './menu_item.service';
import { GetUser } from 'src/auth/decorators/get_user';
import { CreateMenuItemDto } from './dto/create-menu-item.dto';

@Controller('/menu-item')
export class MenuItemController {
  constructor(private readonly menu_item_service: MenuItemService) {}

  @HttpCode(HttpStatus.CREATED)
  @Post()
  create(
    @GetUser() user_id: number,
    @Body() create_menu_item_dto: CreateMenuItemDto,
  ) {
    return this.menu_item_service.create(user_id, create_menu_item_dto);
  }

  @HttpCode(HttpStatus.NO_CONTENT)
  @Delete('/:id')
  delete(@GetUser() user_id: number, @Param('id') id: number) {
    return this.menu_item_service.delete_by_id(user_id, id);
  }

  @Get()
  get_client_menu_item(@GetUser() user_id: number) {
    return this.menu_item_service.find_all(user_id);
  }

  @Get('/:id')
  get_menu_item(@GetUser() user_id: number, @Param('id') id: number) {
    return this.menu_item_service.find_by_id(user_id, id);
  }
}
