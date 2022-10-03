import { Action } from 'src/actions.enum';
import { Article } from 'src/entities/Article';
import { AppAbility } from '../casl-ability.factory';
import { IPolicyHandler } from '../policies';

export class ReadArticlePolicyHandler implements IPolicyHandler {
  handle(ability: AppAbility): boolean {
    return ability.can(Action.Read, Article);
  }
}
