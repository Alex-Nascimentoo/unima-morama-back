import { Body, Controller, Delete, HttpCode, HttpStatus, Param, Post } from '@nestjs/common';
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

  @HttpCode( HttpStatus.NO_CONTENT )
  @Delete( '/:id' )
  delete( @Param( 'id' ) id: number )
  {
    return this.ingredient_service.delete_by_id( id );
  }
}
