import { Injectable, NotAcceptableException } from '@nestjs/common';
import { Action } from './actions.enum';
import { CaslAbilityFactory } from './casl/casl-ability.factory';
import { Article } from './entities/Article';

@Injectable()
export class AppService {
  articles: Article[] = [
    {
      id: 1,
      authorId: 1,
      isPublished: true,
    },
    {
      id: 2,
      authorId: 1,
      isPublished: false,
    },
    {
      id: 3,
      authorId: 2,
      isPublished: true,
    },
    {
      id: 4,
      authorId: 2,
      isPublished: false,
    },
  ];
  constructor(private caslAbilityFactory: CaslAbilityFactory) {}

  create(payload: Article) {
    return this.articles.push({
      id: this.articles.length + 1,
      authorId: payload.authorId,
      isPublished: false,
    });
  }

  list() {
    return this.articles;
  }

  show(id: number) {
    return this.articles.find((a) => a.id === id);
  }

  update(id: number, update, user) {
    const ability = this.caslAbilityFactory.createForUser(user);
    const article = this.articles.find((a) => a.id === id);

    if (ability.cannot(Action.Update, article)) {
      throw new NotAcceptableException();
    }

    const index = this.articles.findIndex((a) => a.id === id);
    return this.articles.splice(index, 1, {
      ...this.articles[index],
      ...update,
    });
  }

  delete(id: number, user) {
    const ability = this.caslAbilityFactory.createForUser(user);
    const article = this.articles.find((a) => a.id === id);
    // does not work if subject is not instance of subject class
    const articleInstance = new Article();
    articleInstance.isPublished = article.isPublished;
    articleInstance.id = article.id;
    articleInstance.authorId = article.authorId;

    if (ability.cannot(Action.Delete, articleInstance)) {
      throw new NotAcceptableException();
    }

    const index = this.articles.findIndex((a) => a.id === id);
    return this.articles.splice(index, 1);
  }
}
