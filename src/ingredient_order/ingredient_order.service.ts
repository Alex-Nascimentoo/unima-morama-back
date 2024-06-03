import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateIngredientOrderDto } from './dto/create-ingredient-order.dto';
import { IngredientService } from 'src/ingredient/ingredient.service';
import { UtilsService } from 'src/utils/utils.service';

@Injectable()
export class IngredientOrderService 
{
  constructor( 
    private readonly prisma: PrismaService, 
    private readonly ingredient_service: IngredientService,
    private readonly utils: UtilsService
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
    await this.find_by_id( user_id, id );
    return await this.prisma.ingredientPurchase.delete( { where: { id: id, client_id: user_id } } );
  }

  private async find_by_id( user_id: number, id: number )
  {
    const ingredient_order = await this.prisma.ingredientPurchase.findUnique( 
      { where: { id: id, client_id: user_id } } 
    )

    if ( !ingredient_order )
    {
      throw new NotFoundException( "Ingredient order doesn't exist." );
    }
  
    return ingredient_order;
  }

  async find_all( user_id: number )
  {
    return await this.prisma.ingredientPurchase.findMany( { where: { client_id: user_id } } );
  }

  async find_by_date( user_id: number, date: string | object )
  {
    const [ inital_date, end_date ] = this.utils.destruct_parameter( date );

    return await this.prisma.ingredientPurchase.findMany({ 
      where: { 
        client_id: user_id, 
        created_at: { 
          gte: `${ inital_date }T00:00:00Z`,
          lte: `${ end_date }T23:59:59Z`
        }
      }
    });
  }
}
