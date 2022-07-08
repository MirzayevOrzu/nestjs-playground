import { InputType, Field, registerEnumType } from '@nestjs/graphql';
import { AllowedPriorities } from '../entities/objective.entity';

registerEnumType(AllowedPriorities, {
  name: 'AllowedPriorities',
});

@InputType()
export class CreateObjectiveInput {
  @Field()
  name: string;

  @Field()
  description: string;

  @Field(() => AllowedPriorities)
  priority: AllowedPriorities;
}
