import { IsString } from 'class-validator';

export class CreateCatDto {
  cat_id: number;

  @IsString()
  name: string;

  @IsString()
  breed: string;
}
