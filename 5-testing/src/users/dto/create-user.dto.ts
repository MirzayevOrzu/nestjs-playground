import { IsString, IsOptional, IsInt, IsEmail } from 'class-validator';

export class CreateUserDto {
  @IsOptional()
  @IsInt()
  userId: number;

  @IsString()
  firstName: string;

  @IsString()
  lastName: string;

  @IsString()
  @IsEmail()
  email: string;

  @IsString()
  password: string;
}
