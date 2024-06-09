import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateMenuItemDto } from 'src/menu_item/dto/create-menu-item.dto'

@Injectable()
export class MenuItemService {
		find_by_date(user_id: number, date: string | object) {
			throw new Error('Method not implemented.');
		}
    constructor( 
        private readonly prisma: PrismaService, 
    ){}
      
    async create(user_id:number, create_menu_itemdto: CreateMenuItemDto ) {
        return await this.prisma.menuItem.create({
            data: {
              ...create_menu_itemdto,
              client: { connect: { id: user_id }}
            }
        }); 
    }
    
    async delete_by_id( user_id: number, id: number )
    {
      await this.find_by_id( user_id, id );
      return await this.prisma.menuItem.delete( { where: { id: id, client_id: user_id } } );
    } 
    
    private async find_by_id( user_id: number, id: number )
    {
        const menu_item = await this.prisma.menuItem.findUnique( 
        { where: { id: id, client_id: user_id } } 
        )

        if ( !menu_item )
        {
            throw new NotFoundException( "Menu Item not found." );
        }
    
        return menu_item;
    }
    async find_all( user_id: number )
  {
    return await this.prisma.menuItem.findMany( { where: { client_id: user_id } } );
  }
}
