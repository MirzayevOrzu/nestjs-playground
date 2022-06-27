import { OmitType, PartialType } from '@nestjs/mapped-types';
import { IsNotEmpty, IsString, Length, ValidateIf } from 'class-validator';
import { CreateUserDto } from './create-user.dto';

export class UpdateUserDto extends PartialType(OmitType(CreateUserDto, ['password'] as const)) {
  firstName?: string;
  lastName?: string;
  email?: string;

  @IsString()
  @Length(5, 10)
  new_password?: string;

  @ValidateIf((o) => o.hasOwnProperty('new_password'))
  @IsString()
  @IsNotEmpty()
  old_password: string;
}
