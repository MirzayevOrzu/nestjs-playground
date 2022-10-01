import { ApiProperty } from '@nestjs/swagger';
import { Max, Min } from 'class-validator';

export class CreateCatDto2 {
  @ApiProperty({
    description: 'Name of cat',
    example: 'Malla',
  })
  name: string;

  @ApiProperty({
    description: 'Breed of cat',
    example: 'Persian',
  })
  breed: string;

  @ApiProperty({
    description: 'Age of cat',
    example: 1,
  })
  @Min(0)
  @Max(20)
  age?: number;
}
