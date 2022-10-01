import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import setUpDocs from './common/docs';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  setUpDocs(app);

  await app.listen(3000);
}
bootstrap();
