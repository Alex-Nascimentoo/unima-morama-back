import { UnitSystem } from "@prisma/client";
import { IsEnum, IsInt, IsNumber } from "class-validator";

export class CreateIngredientOrderDto
{
  @IsInt()
  quantity: number

  @IsNumber()
  price: number

  @IsEnum( UnitSystem )
  unit_system: UnitSystem

  @IsInt()
  ingredient: number
}