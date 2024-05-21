import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateIngredientOrderDto } from './dto/create-ingredient-order.dto';
import { IngredientService } from 'src/ingredient/ingredient.service';

@Injectable()
export class IngredientOrderService 
{
  constructor( 
    private readonly prisma: PrismaService, 
    private readonly ingredient_service: IngredientService 
  ){}


  async create( create_ingredient_order_dto: CreateIngredientOrderDto )
  {
    const ingredient = await this.ingredient_service.find_by_id( create_ingredient_order_dto.ingredient );
    if ( !ingredient )
    {
      throw new NotFoundException(`Ingredient with ID ${ create_ingredient_order_dto.ingredient } not found`);
    }

    return await this.prisma.ingredientPurchase.create({ 
      data: {
        name: ingredient.name,
        ...create_ingredient_order_dto,
        total: create_ingredient_order_dto.price * create_ingredient_order_dto.quantity,
        client: { connect: { id: create_ingredient_order_dto.client } },
        ingredient: { connect: { id: create_ingredient_order_dto.ingredient } },
      }
    });
  }
}
