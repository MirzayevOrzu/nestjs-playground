import {
  InputType,
  registerEnumType,
  PartialType,
  Field,
  Int,
} from '@nestjs/graphql';
import { AllowedPriorities } from '../entities/objective.entity';
import { CreateObjectiveInput } from './create-objective.input';

registerEnumType(AllowedPriorities, {
  name: 'AllowedPriorities',
});

@InputType()
export class UpdateObjectiveInput extends PartialType(CreateObjectiveInput) {
  @Field(() => Int, { description: 'Identifier of objective' })
  id: number;
}
