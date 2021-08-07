import {inject} from '@loopback/core';
import {DefaultCrudRepository} from '@loopback/repository';
import {PostsDatasourseDataSource} from '../datasources';
import {Post, PostRelations} from '../models';

export class PostRepository extends DefaultCrudRepository<
  Post,
  typeof Post.prototype.id,
  PostRelations
> {
  constructor(
    @inject('datasources.posts_datasourse') dataSource: PostsDatasourseDataSource,
  ) {
    super(Post, dataSource);
  }
}
