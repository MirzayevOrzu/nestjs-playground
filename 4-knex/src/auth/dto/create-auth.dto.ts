import { OmitType, PartialType } from '@nestjs/mapped-types';
import { CreateUserDto } from '../../users/dto/create-user.dto';

export class CreateAuthDto extends PartialType(OmitType(CreateUserDto, ['full_name'] as const)) {}
