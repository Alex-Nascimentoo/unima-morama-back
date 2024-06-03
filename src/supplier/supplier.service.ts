import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateSupplierDto } from './dto/create-supplier.dto';

@Injectable()
export class SupplierService 
{
	constructor( private readonly prisma: PrismaService ){}

	async create( user_id: number, create_supplier_dto: CreateSupplierDto )
	{
		const supplier = await this.find_by_name( user_id, create_supplier_dto.name );
		return supplier 
			? supplier 
			: await this.prisma.supplier.create( { data: { ...create_supplier_dto, client_id: user_id } } );
	}

	async find_all( user_id: number )
	{
		return await this.prisma.supplier.findMany( { where: { client_id: user_id } } );
	}

	async find_by_id( user_id: number, id: number )
	{
		const supplier = await this.prisma.supplier.findUnique( { where: { id: id, client_id: user_id } } );
		
		if ( !supplier )
    {
      throw new NotFoundException( "Supplier doesn't exist." );
    }

    return supplier;
	}

	async delete_by_id( user_id: number, id: number )
	{
		await this.find_by_id( user_id, id );
		return await this.prisma.supplier.delete( { where: { id: id, client_id: user_id } } );
	}

	private async find_by_name( user_id: number, name: string )
	{
		return await this.prisma.supplier.findUnique( { where: { name: name, client_id: user_id } } );
	}
}
