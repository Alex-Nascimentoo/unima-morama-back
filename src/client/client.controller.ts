import { Controller, Get, Post, Body, Patch, Param, Delete, HttpCode, HttpStatus } from '@nestjs/common';
import { ClientService } from './client.service';
import { CreateClientDto } from './dto/create-client.dto';

@Controller('/client')
export class ClientController 
{
  constructor( private readonly client_service: ClientService ) {}


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

  @Delete( ':id' )
  @HttpCode( HttpStatus.NO_CONTENT )
  remove( @Param('id') id: number ) 
  {
    this.client_service.remove( id );
  }
}
