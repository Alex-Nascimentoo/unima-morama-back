import { Injectable } from '@nestjs/common';

@Injectable()
export class UtilsService 
{
  destruct_parameter( param: any, times = 2 )
  {
    if ( typeof( param ) === 'object' )
    {
      const A = [];
      for ( let i = 0; i < times; i++ )
      {
        A.push( param[i] );
      }

      return A;
    }
    
    return new Array( times ).fill( param );
  }

}
