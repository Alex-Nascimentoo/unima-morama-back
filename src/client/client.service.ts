import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateClientDto } from './dto/create-client.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { hash } from 'bcrypt';

@Injectable()
export class ClientService 
{
  constructor( private readonly prisma: PrismaService ){}


  async create( create_client_dto: CreateClientDto ) 
  {
    return await this.prisma.client.create(
      {
        data: {
          ...create_client_dto,
          password: await hash( create_client_dto.password, 10 )
        },
        select: {
          id: true,
          name: true,
          email: true,
        }
      }
    );
  }

  async get_by_id( id: number ) 
  {

    const client = await this.prisma.client.findUnique(
      {
        where: {
          id: id
        },
        select: {
          id: true,
          name: true,
          email: true
        }
      }
    );

    if ( !client )
    {
      throw new NotFoundException( "Client doesn't exist." );
    }

    return client;
  }

  async get_by_email( email: string ) 
  {
    const client = await this.prisma.client.findUnique( { where: { email: email } } );

    if ( !client )
    {
      throw new NotFoundException( "Client doesn't exist." );
    }

    return client;
  }

  async delete_by_id( id: number ) 
  {
    await this.get_by_id( id );
    return await this.prisma.client.delete( { where: { id: id } } );
  }
}
