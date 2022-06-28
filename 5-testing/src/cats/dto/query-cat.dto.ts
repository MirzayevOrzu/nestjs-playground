import { PartialType, PickType } from '@nestjs/mapped-types';
import { CreateCatDto } from './create-cat.dto';

export class QueryCatDto extends PartialType(
  PickType(CreateCatDto, ['catId', 'userId' as const])
) {}
