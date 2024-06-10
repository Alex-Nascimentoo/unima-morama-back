import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateSaleDto } from './dto/create-sale.dto';
import { MenuItemService } from 'src/menu_item/menu_item.service';

@Injectable()
export class SaleService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly menu_item_service: MenuItemService,
  ) {}

  async create(user_id: number, create_sale_dto: CreateSaleDto) {
    const menu_item = await this.menu_item_service.find_by_id(
      user_id,
      create_sale_dto.menu_item_id,
    );

    return await this.prisma.sale.create({
      data: {
        price: create_sale_dto.price,
        quantity: create_sale_dto.quantity,
        total: create_sale_dto.total,
        client: { connect: { id: user_id } },
        menu_item: { connect: { id: menu_item.id } },
      },
    });
  }

  async delete_by_id(user_id: number, id: number) {
    await this.find_by_id(user_id, id);
    return await this.prisma.sale.delete({
      where: { id: id, client_id: user_id },
    });
  }

  async find_by_id(user_id: number, id: number) {
    const sale = await this.prisma.sale.findUnique({
      where: { id: id, client_id: user_id },
    });

    if (!sale) {
      throw new NotFoundException('Sale not found.');
    }

    return sale;
  }

  async find_all(user_id: number) {
    return await this.prisma.sale.findMany({
      where: { client_id: user_id },
    });
  }
}
