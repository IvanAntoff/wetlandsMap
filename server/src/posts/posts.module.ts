import { Module } from '@nestjs/common';
import { PostsService } from './posts.service';
import { PostsController } from './posts.controller';
import { PostSchema } from './schema/posts.schema';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [
    MongooseModule.forFeature([
      {name: 'posts', schema: PostSchema},
    ])
  ],
  providers: [PostsService],
  controllers: [PostsController]
})
export class PostsModule {}
