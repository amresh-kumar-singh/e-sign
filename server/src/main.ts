import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DeleteFileOnErrorFilter } from './infrastructure/common/filters/exception.filter';
import * as dotenv from 'dotenv';

dotenv.config({ path: './env/local.env' });

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalFilters(new DeleteFileOnErrorFilter());
  app.enableCors({
    origin: '*',
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS',
    //  credentials: true,
  });
  await app.listen(3000);
}
bootstrap();
