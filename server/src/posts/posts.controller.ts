import { Body, Controller, Get, Param, Post, Query } from '@nestjs/common';
import { ESTADO, groupedPosts, Posts } from 'src/interfaces/posts.interface';
import { PostsService } from './posts.service';

@Controller('posts')
export class PostsController {
    constructor(
        private readonly postsService: PostsService
    ) {}

    @Get()
    public async findAll(@Query('group') group: boolean): Promise<Posts[] | groupedPosts> {
        try {
            const posts = await this.postsService.findAll();
            if (group) {
                const groupedPosts: groupedPosts = {
                    aprobados: posts.filter((post) => post.estado === ESTADO.aprobado),
                    pendientes: posts.filter((post) => post.estado === ESTADO.pendiente),
                    rechazados: posts.filter((post) => post.estado === ESTADO.rechazado),
                }
                return groupedPosts;
            }
            return posts;
        }
        catch (error) {
            return error
        }
    }

    @Get(':id')
    public async findOne(@Param('id') id: string): Promise<Posts> {
        try {
            return await this.postsService.findOne(id);
        }
        catch (error) {
            return error
        }
    }

    @Post()
    public create(@Body() newPost: Posts): Promise<Posts> {
        try {
            return this.postsService.create(newPost)
        }
        catch (error) {
            return error
        }
    }

    @Post('/changeState')
    public changeState(@Body() body: {id: string, estado: ESTADO}): Promise<Posts> {
        try {
            return this.postsService.changeState(body.id, body.estado)
        }
        catch (error) {
            return error
        }
    }
}
