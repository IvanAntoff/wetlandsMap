import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose';
import { EnumsModule } from './enums/enums.module';
import { PostsModule } from './posts/posts.module';

@Module({
  imports: [
    MongooseModule.forRoot('mongodb://localhost/humedales_posts'),
    EnumsModule,
    PostsModule
  ],
  controllers: [
    AppController,
  ],
  providers: [
    AppService, 
  ],
})
export class AppModule {}
