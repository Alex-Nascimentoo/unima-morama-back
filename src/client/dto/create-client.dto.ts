import { IsEmail, IsString, IsStrongPassword } from "class-validator";

export class CreateClientDto {
    @IsString()
    name: string;

    @IsEmail()
    email: string;
    
    @IsStrongPassword()
    password: string;
}
