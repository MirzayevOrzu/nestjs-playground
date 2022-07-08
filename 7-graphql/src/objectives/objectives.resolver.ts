import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { ObjectivesService } from './objectives.service';
import { Objective } from './entities/objective.entity';
import { CreateObjectiveInput } from './dto/create-objective.input';
import { UpdateObjectiveInput } from './dto/update-objective.input';

@Resolver(() => Objective)
export class ObjectivesResolver {
  constructor(private readonly objectivesService: ObjectivesService) {}

  @Mutation(() => Objective)
  createObjective(
    @Args('createObjectiveInput') createObjectiveInput: CreateObjectiveInput,
  ) {
    return this.objectivesService.create(createObjectiveInput);
  }

  @Query(() => [Objective], { name: 'objectives' })
  findAll() {
    return this.objectivesService.findAll();
  }

  @Query(() => Objective, { name: 'objective' })
  findOne(@Args('id', { type: () => Int }) id: number) {
    return this.objectivesService.findOne(id);
  }

  @Mutation(() => Objective)
  updateObjective(
    @Args('updateObjectiveInput') updateObjectiveInput: UpdateObjectiveInput,
  ) {
    return this.objectivesService.update(
      updateObjectiveInput.id,
      updateObjectiveInput,
    );
  }

  @Mutation(() => Objective)
  removeObjective(@Args('id', { type: () => Int }) id: number) {
    return this.objectivesService.remove(id);
  }
}
