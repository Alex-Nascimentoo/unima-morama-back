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


  async create( user_id: number, create_ingredient_order_dto: CreateIngredientOrderDto )
  {
    const ingredient = await this.ingredient_service.find_by_id( user_id, create_ingredient_order_dto.ingredient );

    return await this.prisma.ingredientPurchase.create({ 
      data: {
        name: ingredient.name,
        ...create_ingredient_order_dto,
        total: create_ingredient_order_dto.price * create_ingredient_order_dto.quantity,
        client: { connect: { id: user_id } },
        ingredient: { connect: { id: create_ingredient_order_dto.ingredient } },
      }
    });
  }

  async delete_by_id( user_id: number, id: number )
  {
    this.find_by_id( user_id, id );

    return await this.prisma.ingredientPurchase.delete( { where: { id: id, client_id: user_id } } );
  }

  private async find_by_id( user_id: number, id: number )
  {
    const ingredient_order = await this.prisma.ingredientPurchase.findUnique( { where: { id: id, client_id: user_id } } )
  
    return ingredient_order ? ingredient_order : new NotFoundException( "Ingredient order doesn't exist." );
  }
}
