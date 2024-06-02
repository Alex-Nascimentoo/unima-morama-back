import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateIngredientDto } from './dto/create-ingredient.dto';
import { NotFoundError } from 'rxjs';

@Injectable()
export class IngredientService 
{
  constructor( private readonly prisma: PrismaService ){}


  async create( user_id: number, create_ingredient_dto: CreateIngredientDto )
  {
    return await this.prisma.ingredient.create( { data: { ...create_ingredient_dto, client_id: user_id } } );
  }

  async delete_by_id( user_id: number, id: number )
  {
    this.find_by_id( user_id, id );

    return await this.prisma.ingredient.delete( { where: { id: id, client_id: user_id } } );
  }

  async find_all( user_id: number )
  {
    return await this.prisma.ingredient.findMany( { where: { client_id: user_id } } );
  }

  async find_by_id( user_id: number, id: number )
  {
    const ingredient = await this.prisma.ingredient.findUnique( { where: { id: id, client_id: user_id } } );

    return ingredient? ingredient : new NotFoundException( "Ingredient doesn't exist." )
  }
}
