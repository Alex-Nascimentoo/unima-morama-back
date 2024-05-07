import { Injectable } from '@nestjs/common';
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

  findOne(id: number) {
    return this.prisma.client.findUnique(
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

  update(id: number, update_client_dto: UpdateClientDto) {
    return `This action updates a #${id} client`;
  }

  remove(id: number) {
    return `This action removes a #${id} client`;
  }
}
