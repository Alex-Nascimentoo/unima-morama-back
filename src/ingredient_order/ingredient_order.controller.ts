import { Body, Controller, HttpCode, HttpStatus, Post } from '@nestjs/common';
import { IngredientOrderService } from './ingredient_order.service';
import { CreateIngredientOrderDto } from './dto/create-ingredient-order.dto';

@Controller('/ingredient-order')
export class IngredientOrderController 
{
  constructor( private readonly ingredient_order_service: IngredientOrderService ){}


  @HttpCode( HttpStatus.CREATED )
  @Post()
  create( @Body() create_ingredient_order_dto: CreateIngredientOrderDto )
  {
    return this.ingredient_order_service.create( create_ingredient_order_dto );
  }
}
