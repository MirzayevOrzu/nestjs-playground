import { ObjectType, Field, Int, registerEnumType } from '@nestjs/graphql';

export enum AllowedPriorities {
  HIGH = 'high',
  MODERATE = 'moderate',
  LOW = 'low',
}

registerEnumType(AllowedPriorities, {
  name: 'AllowedPriorities',
});

@ObjectType()
export class Objective {
  @Field(() => Int, { description: 'Identifier of objective' })
  id: number;

  @Field({ nullable: false, description: 'Name of objective' })
  name: string;

  @Field({ nullable: false, description: 'Short description of objective' })
  description: string;

  @Field(() => AllowedPriorities)
  priority: AllowedPriorities;
}
