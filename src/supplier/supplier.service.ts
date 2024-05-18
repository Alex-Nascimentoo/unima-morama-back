import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateSupplierDto } from './dto/create-supplier.dto';

@Injectable()
export class SupplierService 
{
	constructor( private readonly prisma: PrismaService ){}

	async create( create_supplier_dto: CreateSupplierDto )
	{
		return await this.prisma.supplier.create( { data: create_supplier_dto } );
	}

	async find_all( client_id: number )
	{
		return await this.prisma.supplier.findMany( { where: { client_id: client_id } } );
	}

	async delete_by_id( id: number )
	{
		return await this.prisma.supplier.delete( { where: { id: id } } );
	}
}