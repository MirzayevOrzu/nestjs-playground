import { Body, Controller, Post } from '@nestjs/common';
import { ApiOperation } from '@nestjs/swagger';
import { CreateCatDto1 } from './dto/create-cat-1.dto';
import { CreateCatDto2 } from './dto/create-cat-2.dto';

@Controller('cats')
export class CatsController {
  /**
   * Create cat (Documentation with CLI plugin)
   */
  @Post('method-one')
  createCat1(@Body() payload: CreateCatDto1) {
    return payload;
  }

  @ApiOperation({
    description: 'Create cat (Documentation with dedicated decorators)',
  })
  @Post('method-two')
  createCat2(@Body() payload: CreateCatDto2) {
    return payload;
  }
}
