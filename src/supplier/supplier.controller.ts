import { Body, Controller, Delete, Get, HttpCode, HttpStatus, Param, Post, Request } from '@nestjs/common';
import { CreateSupplierDto } from './dto/create-supplier.dto';
import { SupplierService } from './supplier.service';
import { GetUser } from 'src/auth/decorators/get_user';

@Controller('/supplier')
export class SupplierController 
{
	constructor( private readonly supplier_service: SupplierService ){}


	@HttpCode( HttpStatus.CREATED )
	@Post()
	create( @GetUser() user_id: number, @Body() create_supplier_dto: CreateSupplierDto )
	{
		return this.supplier_service.create( user_id, create_supplier_dto );
	}

	@Get()
	get_client_suppliers( @Request() req: any )
	{
		return this.supplier_service.find_all( req.sub );
	}

	@Get( '/:id' )
	get_supplier( @Param( 'id' ) id: number )
	{
		return this.supplier_service.find_by_id( id );
	}

	// TODO: permission to delete only if supplier pertences to client
	@HttpCode( HttpStatus.NO_CONTENT )
	@Delete( '/:id' )
	delete( @Param( 'id' ) id: number )
	{
		return this.supplier_service.delete_by_id( id );
	}
}
