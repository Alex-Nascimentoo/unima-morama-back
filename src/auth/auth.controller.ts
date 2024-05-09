import { Body, Controller, HttpCode, HttpStatus, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { SignInDto } from './dto/sign_in_dto';

@Controller('auth')
export class AuthController 
{
    constructor( private auth_service: AuthService ) {}


    @HttpCode( HttpStatus.OK )
    @Post()
    sign_in( @Body() sign_in_dto: SignInDto )
    {
        return this.auth_service.signIn( sign_in_dto.email, sign_in_dto.password );
    }
}
