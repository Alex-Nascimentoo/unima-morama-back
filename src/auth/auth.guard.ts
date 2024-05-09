import 
{
    CanActivate,
    ExecutionContext,
    Injectable,
    UnauthorizedException,
} 
from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { JwtService } from '@nestjs/jwt';
import { Request } from 'express';
import { SKIP_JWT_KEY } from './decorators/skip_auth';

  
@Injectable()
export class JWTAuth implements CanActivate 
{
    constructor( private jwt_service: JwtService, private metadata: Reflector ) {}

    async canActivate( context: ExecutionContext ): Promise<boolean> 
    {
        const skip_jwt: boolean = this.metadata.getAllAndOverride(
            SKIP_JWT_KEY,
            [ context.getHandler(), context.getClass() ]
        )
        if ( skip_jwt )
        {
            return true;
        }

        const request = context.switchToHttp().getRequest();
        const token = this.extractTokenFromHeader(request);
        if ( !token ) 
        {
            throw new UnauthorizedException();
        }

        try 
        {
            const payload = await this.jwt_service.verifyAsync(
                token,
                { secret: process.env.JWT_SECRET_KEY }
            );
            // 💡 We're assigning the payload to the request object here
            // so that we can access it in our route handlers
            request['user'] = payload;
        } 
        catch 
        {
            throw new UnauthorizedException();
        }
        return true;
    }

    private extractTokenFromHeader( request: Request ): string | undefined 
    {
        const [type, token] = request.headers.authorization?.split(' ') ?? [];
        return type === 'Bearer' ? token : undefined;
    }
}
  