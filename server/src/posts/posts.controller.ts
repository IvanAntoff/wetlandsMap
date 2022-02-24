import { Body, Controller, Delete, Get, Param, Post, Query } from '@nestjs/common';
import { ESTADO, groupedPosts, post } from 'src/interfaces/posts.interface';
import { PostsService } from './posts.service';

@Controller('posts')
export class PostsController {
    constructor(
        private readonly postsService: PostsService
    ) {}

    @Get()
    public async findAll(
        @Query('state') state: string, 
        @Query('group') group: boolean, 
        @Query('normalize') normalize: boolean
    ): Promise<post[] | groupedPosts> {
        try {
            let auxState = undefined;
            if (state) auxState = state.split(',')
            const posts = await this.postsService.findAll(normalize, auxState);
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
    public async findOne(@Param('id') id: string, @Query('normalize') normalize: boolean): Promise<post> {
        try {
            return await this.postsService.findOne(id, normalize);
        }
        catch (error) {
            return error
        }
    }

    @Post()
    public create(@Body() newPost: post): Promise<post> {
        try {
            return this.postsService.create(newPost)
        }
        catch (error) {
            return error
        }
    }

    @Post('/changeState')
    public changeState(@Body() body: {id: string, estado: ESTADO}): Promise<post> {
        try {
            return this.postsService.changeState(body.id, body.estado)
        }
        catch (error) {
            return error
        }
    }

    @Post('/deletePost/:id')
    public deletePost(@Param('id') id: string): Promise<boolean> {
        try {
            return this.postsService.delete(id)
        }
        catch (error) {
            return error
        }
    }
}
