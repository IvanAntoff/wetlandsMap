import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose';
import { EnumsModule } from './enums/enums.module';

@Module({
  imports: [
    MongooseModule.forRoot('mongodb://localhost/humedales_posts'),
    EnumsModule
  ],
  controllers: [
    AppController,
  ],
  providers: [
    AppService, 
  ],
})
export class AppModule {}
