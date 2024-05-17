import { Body, Controller, HttpCode, HttpStatus, Post } from '@nestjs/common';
import { CreateSupplierDto } from './dto/create-supplier.dto';
import { SupplierService } from './supplier.service';

@Controller('/supplier')
export class SupplierController 
{
	constructor( private readonly supplier_service: SupplierService ){}


	@HttpCode( HttpStatus.CREATED )
	@Post()
	create( @Body() create_supplier_dto: CreateSupplierDto )
	{
		return this.supplier_service.create( create_supplier_dto );
	}
}
