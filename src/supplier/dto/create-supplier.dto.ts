import { IsInt, IsString } from "class-validator";

export class CreateSupplierDto
{
    @IsString()
    name: string

    @IsInt()
    client_id: number
}