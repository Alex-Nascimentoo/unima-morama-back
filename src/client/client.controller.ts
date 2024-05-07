import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { ClientService } from './client.service';
import { CreateClientDto } from './dto/create-client.dto';
import { UpdateClientDto } from './dto/update-client.dto';

@Controller('/client')
export class ClientController 
{
  constructor( private readonly client_service: ClientService ) {}

  @Post()
  create( @Body() create_client_dto: CreateClientDto ) {
    return this.client_service.create( create_client_dto );
  }

  @Get( ':id' )
  findOne( @Param('id') id: number ) {
    return this.client_service.findOne(+id);
  }

  @Patch(':id')
  update( @Param('id') id: number, @Body() update_client_dto: UpdateClientDto ) {
    return this.client_service.update(+id, update_client_dto);
  }

  @Delete( ':id' )
  remove( @Param('id') id: number ) {
    return this.client_service.remove(+id);
  }
}
