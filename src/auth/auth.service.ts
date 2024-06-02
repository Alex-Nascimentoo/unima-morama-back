import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { compare } from 'bcrypt';
import { ClientService } from 'src/client/client.service';


@Injectable()
export class AuthService 
{
  constructor( private client_service: ClientService, private jwt_service: JwtService ) {}


  async signIn( email: string, request_password: string )
  {
    const client = await this.client_service.get_by_email( email );
    
    // @ts-ignore
    if ( ! await compare( request_password, client.password ) ) 
    {
      throw new UnauthorizedException();
    }
    // @ts-ignore
    const payload = { sub: client.id, email: email }
    return { access_token: await this.jwt_service.signAsync( payload ) };
  }
}