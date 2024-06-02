import { Body, Controller, Delete, Get, HttpCode, HttpStatus, Param, Post, Request } from '@nestjs/common';
import { IngredientService } from './ingredient.service';
import { CreateIngredientDto } from './dto/create-ingredient.dto';
import { GetUser } from 'src/auth/decorators/get_user';

@Controller( '/ingredient' )
export class IngredientController 
{
  constructor( private readonly ingredient_service: IngredientService ){}


  @HttpCode( HttpStatus.CREATED )
  @Post()
  create( @GetUser() user_id: number, @Body() create_ingredient_dto: CreateIngredientDto )
  {
    return this.ingredient_service.create( user_id, create_ingredient_dto );
  }

  @HttpCode( HttpStatus.NO_CONTENT )
  @Delete( '/:id' )
  delete( @GetUser() user_id: number, @Param( 'id' ) id: number )
  {
    return this.ingredient_service.delete_by_id( user_id, id );
  }

  @Get()
  get_client_ingredients( @GetUser() user_id: number )
  {
    return this.ingredient_service.find_all( user_id );
  }

  @Get( ':id' )
  get_ingredient( @GetUser() user_id: number, id: number )
  {
    return this.ingredient_service.find_by_id( user_id, id );
  }
}
