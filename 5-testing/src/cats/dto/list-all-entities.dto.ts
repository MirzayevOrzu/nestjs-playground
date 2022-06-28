import { PartialType } from '@nestjs/mapped-types';
import { CreateCatDto } from './create-cat.dto';

export class ListAllEntities extends PartialType(CreateCatDto) {
  perPage?: number;
  page?: number;
}
