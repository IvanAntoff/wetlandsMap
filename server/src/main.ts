import { NestFactory } from '@nestjs/core';
import { join } from 'path';
import { AppModule } from './app.module';
import { NestExpressApplication } from '@nestjs/platform-express';

export const FILE_FOLDER = process.env.FILE_FOLDER || join(__dirname,'uploads');
export const URL_SV = process.env.FILES_URL || 'http://localhost:3001/uploads/';

console.log(`/************************************************************************************/`);
console.log(`FILE_FOLDER: ${FILE_FOLDER}`);
console.log(`URL_SV: ${URL_SV}`);
console.log(`MONGO_URL: ${process.env.MONGO_URL || 'mongodb://localhost/humedales_posts'}`);
console.log(`/************************************************************************************/`);

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  app.enableCors({
    origin: '*',
    methods: ['GET','HEAD','PUT','PATCH','POST','DELETE','OPTIONS'],
    optionsSuccessStatus: 204
  });
  app.useStaticAssets(join(__dirname,'uploads'),{prefix: '/uploads'});
  await app.listen(3001);
}

bootstrap();