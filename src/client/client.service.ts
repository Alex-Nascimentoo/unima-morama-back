import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateClientDto } from './dto/create-client.dto';
import { UpdateClientDto } from './dto/update-client.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { hash } from 'bcrypt';

@Injectable()
export class ClientService 
{
  constructor( private readonly prisma: PrismaService ){}


  async create( create_client_dto: CreateClientDto ) 
  {
    const client = await this.prisma.client.create(
      {
        data: {
          ...create_client_dto,
          password: await hash( create_client_dto.password, 10 )
        }
      }
    );

    const { password, ...client_response } = client;
    return client_response;
  }

  async findOne( id: number ) 
  {
    return await this.prisma.client.findUnique(
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
  }

  async remove( id: number ) 
  {
    return await this.prisma.client.delete(
      {
        where: { id: id }
      }
    ).catch( () => { throw new NotFoundException( `Can't find item with id ${id} in database` ) } )
  }
}
