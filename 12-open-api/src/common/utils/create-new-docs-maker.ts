import { INestApplication } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

type NewDocsInstanceOptions = {
  path: string;
  module: any;
  title: string;
};

export const createNewDocsInstanceMaker = (options: NewDocsInstanceOptions) => {
  const config = new DocumentBuilder().setTitle(options.title).build();

  return (app: INestApplication) => {
    const document = SwaggerModule.createDocument(app, config, {
      include: [options.module],
    });

    SwaggerModule.setup(options.path, app, document);
  };
};
