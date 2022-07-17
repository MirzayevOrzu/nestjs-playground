import { IsString, IsOptional, IsInt, IsEmail, IsEnum } from 'class-validator';

enum Role {
  Admin = 'admin',
  User = 'user'
}

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

  @IsEnum(Role)
  role: 'user' | 'admin';
}
