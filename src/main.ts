import { NestFactory } from '@nestjs/core';
import { AppModule } from './modules/app/app.module';
import { startNestRemix } from 'nestjs-remix';
import { NestApplication } from '@nestjs/core';

async function bootstrap() {
  const app = await NestFactory.create<NestApplication>(AppModule);
  await app.listen(3000);
  startNestRemix(app);
}
bootstrap();
