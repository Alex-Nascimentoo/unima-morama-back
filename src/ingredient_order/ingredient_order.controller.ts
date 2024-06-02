import { Body, Controller, HttpCode, HttpStatus, Post } from '@nestjs/common';
import { IngredientOrderService } from './ingredient_order.service';
import { CreateIngredientOrderDto } from './dto/create-ingredient-order.dto';
import { GetUser } from 'src/auth/decorators/get_user';

@Controller('/ingredient-order')
export class IngredientOrderController 
{
  constructor( private readonly ingredient_order_service: IngredientOrderService ){}


  @HttpCode( HttpStatus.CREATED )
  @Post()
  create( @GetUser() user_id: number, @Body() create_ingredient_order_dto: CreateIngredientOrderDto )
  {
    return this.ingredient_order_service.create( user_id, create_ingredient_order_dto );
  }
}
