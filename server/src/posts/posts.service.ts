import { BadGatewayException, ForbiddenException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { ESTADO, Posts } from 'src/interfaces/posts.interface';

@Injectable()
export class PostsService {
    constructor(
        @InjectModel('posts') private posts: Model <Posts>,
    ) {}

    public async findAll(): Promise <Posts[]> {
        const response: Posts[] = await this.posts.find();
        return response ? response : [];
    }
    
    public async findOne(id: string): Promise<Posts> {
        if (!id) new BadGatewayException('id or type not include');
        const response:Posts = await this.posts.findById(id);
        if (!response) {
          throw new NotFoundException('Enum not found.');
        }
        return response;
    }

    public async create(newPost: Posts): Promise <Posts> {
        if (!newPost) new BadGatewayException('Name or type not include');
        let response = await this.posts.create(newPost);
        return response ? newPost : null;
    }

    public async changeState(postId: string, state: ESTADO): Promise <Posts> {
        if (!postId || !state) new BadGatewayException('id or state not include');
        let post = await this.findOne(postId);
        if (!post) new ForbiddenException('Post not found');
        let response = await this.posts.create(post);
        return response ? post : null;
    }

    public async delete(postId: string): Promise <Posts> {
        if (!postId) new BadGatewayException('id not include');
        let post = await this.findOne(postId);
        if (!post) new ForbiddenException('Post not found');
        let response = await this.posts.deleteOne({_id: post._id});
        return response ? post : null;
    }
}
