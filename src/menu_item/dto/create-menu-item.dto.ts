import { IsNumber, IsString } from "class-validator";

export class CreateMenuItemDto
{
  @IsString()
  name: string;

  @IsNumber()
  price: number;
}