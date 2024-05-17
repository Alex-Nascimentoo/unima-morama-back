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
}
