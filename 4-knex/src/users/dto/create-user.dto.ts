import { IsEmail, IsString, Length } from 'class-validator';
import { IsFullName } from '../../common/decorators/IsFullName';

export class CreateUserDto {
  @IsFullName('full_name')
  full_name: string;

  @IsString()
  @IsEmail()
  email: string;

  @IsString()
  @Length(5, 10)
  password: string;
}
