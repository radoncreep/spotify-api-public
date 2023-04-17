import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ConfigService } from '@nestjs/config';
import * as logger from 'morgan';


async function bootstrap() {
  const app = await NestFactory.create(AppModule, {abortOnError: true, cors: true });

  const configService = app.get(ConfigService);

  app.use(logger('dev'));
  // app.enableCors();

  const PORT = configService.get('PORT') as number;
  await app.listen(PORT);
}
bootstrap();
