import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateIngredientDto } from './dto/create-ingredient.dto';

@Injectable()
export class IngredientService 
{
  constructor( private readonly prisma: PrismaService ){}


  async create( create_ingredient_dto: CreateIngredientDto )
  {
    return await this.prisma.ingredient.create( { data: create_ingredient_dto } );
  }

  async delete_by_id( id: number )
  {
    return await this.prisma.ingredient.delete( { where: { id: id } } );
  }

  async find_all( client_id: number )
  {
    return await this.prisma.ingredient.findMany( { where: { client_id: client_id } } );
  }

  async find_by_id( id: number )
  {
    return await this.prisma.ingredient.findUnique( { where: { id: id } } );
  }
}
