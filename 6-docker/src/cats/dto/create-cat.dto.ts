import { IsString, IsOptional, IsInt } from 'class-validator';

export class CreateCatDto {
  catId: number;

  @IsString()
  name: string;

  @IsString()
  breed: string;

  @IsOptional()
  @IsInt()
  userId: number;
}
