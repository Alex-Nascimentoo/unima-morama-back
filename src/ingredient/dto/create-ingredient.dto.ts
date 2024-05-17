import { IsInt, IsString } from "class-validator";

export class CreateIngredientDto
{
  @IsString()
  name: string

  @IsInt()
  client_id: number
}