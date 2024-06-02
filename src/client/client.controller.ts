import { Controller, Get, Post, Body, Patch, Param, Delete, HttpCode, HttpStatus, Request } from '@nestjs/common';
import { ClientService } from './client.service';
import { CreateClientDto } from './dto/create-client.dto';
import { SkipJWT } from 'src/auth/decorators/skip_auth';
import { GetUser } from 'src/auth/decorators/get_user';

@Controller('/client')
export class ClientController 
{
  constructor( private readonly client_service: ClientService ) {}


  @SkipJWT()
  @Post()
  create( @Body() create_client_dto: CreateClientDto ) 
  {
    return this.client_service.create( create_client_dto );
  }

  @Get( ':id' )
  findOne( @Param('id') id: number ) 
  {
    return this.client_service.get_by_id( id );
  }

  @Delete()
  @HttpCode( HttpStatus.NO_CONTENT )
  remove( @GetUser() id: number ) 
  {
    this.client_service.delete( id );
  }
}
