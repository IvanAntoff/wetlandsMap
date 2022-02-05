import { NestFactory } from '@nestjs/core';
import { join } from 'path';
import { AppModule } from './app.module';
import { NestExpressApplication } from '@nestjs/platform-express';
export const FILE_FOLDER = join(__dirname,'..','uploads');
export const URL_SV = 'http://localhost:3001/uploads/';
// export const URL_SV = 'http://localhost:3001/uploads/';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule, { cors: true });
  app.useStaticAssets(FILE_FOLDER,{prefix: '/uploads'});
  await app.listen(3001);
}
bootstrap();
