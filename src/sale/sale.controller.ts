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
import { SaleService } from './sale.service';
import { GetUser } from 'src/auth/decorators/get_user';
import { CreateSaleDto } from './dto/create-sale.dto';

@Controller('/sale')
export class SaleController {
  constructor(private readonly sale_service: SaleService) {}

  @HttpCode(HttpStatus.CREATED)
  @Post()
  create(@GetUser() user_id: number, @Body() create_sale_dto: CreateSaleDto) {
    return this.sale_service.create(user_id, create_sale_dto);
  }

  @HttpCode(HttpStatus.NO_CONTENT)
  @Delete('/:id')
  delete(@GetUser() user_id: number, @Param('id') id: number) {
    return this.sale_service.delete_by_id(user_id, id);
  }

  @Get()
  get_client_sales(@GetUser() user_id: number) {
    return this.sale_service.find_all(user_id);
  }

  @Get('/:id')
  get_sale(@GetUser() user_id: number, @Param('id') id: number) {
    return this.sale_service.find_by_id(user_id, id);
  }
}
