import { IsNotEmpty, IsNumber } from 'class-validator';

export class CreateSaleDto {
  @IsNotEmpty()
  @IsNumber()
  menu_item_id: number;

  @IsNotEmpty()
  @IsNumber()
  price: number;

  @IsNotEmpty()
  @IsNumber()
  quantity: number;

  @IsNotEmpty()
  @IsNumber()
  total: number;
}
