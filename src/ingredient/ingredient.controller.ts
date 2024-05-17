import { Body, Controller, HttpCode, HttpStatus, Post } from '@nestjs/common';
import { IngredientService } from './ingredient.service';
import { CreateIngredientDto } from './dto/create-ingredient.dto';

@Controller( '/ingredient' )
export class IngredientController 
{
  constructor( private readonly ingredient_service: IngredientService ){}


  @HttpCode( HttpStatus.CREATED )
  @Post()
  create( @Body() create_ingredient_dto: CreateIngredientDto )
  {
    return this.ingredient_service.create( create_ingredient_dto );
  }
}
