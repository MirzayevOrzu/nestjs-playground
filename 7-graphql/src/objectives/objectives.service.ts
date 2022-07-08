import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateObjectiveInput } from './dto/create-objective.input';
import { UpdateObjectiveInput } from './dto/update-objective.input';
import { AllowedPriorities, Objective } from './entities/objective.entity';

@Injectable()
export class ObjectivesService {
  objectives: Objective[];

  constructor() {
    this.objectives = [
      {
        id: 1,
        name: 'Learn CS in depth',
        description: 'Algorithms and Data structures',
        priority: AllowedPriorities.MODERATE,
      },
    ];
  }

  create(createObjectiveInput: CreateObjectiveInput) {
    console.log(createObjectiveInput);

    const newObjective = {
      id: this.objectives.length + 1,
      ...createObjectiveInput,
    };

    this.objectives.push(newObjective);

    return newObjective;
  }

  findAll() {
    return this.objectives;
  }

  findOne(id: number) {
    const objective = this.objectives.find((objective) => objective.id === id);

    if (!objective) {
      throw new NotFoundException();
    }

    return objective;
  }

  update(id: number, updateObjectiveInput: UpdateObjectiveInput) {
    let index;
    const objective = this.objectives.find((o, i) => {
      if (o.id === id) {
        index = i;
        return true;
      }
      return false;
    });

    const update = {
      ...objective,
      ...updateObjectiveInput,
    };

    this.objectives.splice(index, 1, update);

    return update;
  }

  remove(id: number) {
    let index;
    const objective = this.objectives.find((o, i) => {
      if (o.id === id) {
        index = i;
        return true;
      }
      return false;
    });

    this.objectives.splice(index, 1);

    return objective;
  }
}
