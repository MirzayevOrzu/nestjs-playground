import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  Req,
  UseGuards,
} from '@nestjs/common';
import { AppService } from './app.service';
import { JwtAuthGuard } from './auth/jwt-auth.guard';
import { CheckPolicies } from './casl/check-policies.decorator';
import { PoliciesGuard } from './casl/policies.guard';
import { CreateArticlePolicyHandler } from './casl/policy-handlers/create-article.policy';
import { DeleteArticlePolicyHandler } from './casl/policy-handlers/delete-article.policy';
import { ReadArticlePolicyHandler } from './casl/policy-handlers/read-article.policy';
import { UpdateArticlePolicyHandler } from './casl/policy-handlers/update-article.policy';
import { Article } from './entities/Article';

@Controller('articles')
export class AppController {
  constructor(private readonly appService: AppService) {}

  @CheckPolicies(new CreateArticlePolicyHandler())
  @UseGuards(JwtAuthGuard, PoliciesGuard)
  @Post()
  create(@Body() payload: Article, @Req() { user: { id } }) {
    return this.appService.create({ ...payload, authorId: id });
  }

  @CheckPolicies(new ReadArticlePolicyHandler())
  @UseGuards(JwtAuthGuard, PoliciesGuard)
  @Get()
  list() {
    return this.appService.list();
  }

  @CheckPolicies(new ReadArticlePolicyHandler())
  @UseGuards(JwtAuthGuard, PoliciesGuard)
  @Get(':id')
  show(@Param('id', ParseIntPipe) id: number) {
    return this.appService.show(id);
  }

  @CheckPolicies(new UpdateArticlePolicyHandler())
  @UseGuards(JwtAuthGuard, PoliciesGuard)
  @Patch(':id')
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() update: any,
    @Req() { user }: any,
  ) {
    return this.appService.update(id, update, user);
  }

  @CheckPolicies(new DeleteArticlePolicyHandler())
  @UseGuards(JwtAuthGuard, PoliciesGuard)
  @Delete(':id')
  delete(@Param('id', ParseIntPipe) id: number, @Req() { user }: any) {
    return this.appService.delete(id, user);
  }
}
