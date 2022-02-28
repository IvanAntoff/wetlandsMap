import { Body, Controller, Get, Param, Post, Query } from '@nestjs/common';
import { comment } from 'src/interfaces/comment.interface';
import { ESTADO } from 'src/interfaces/posts.interface';
import { CommentsService } from './comments.service';

@Controller('comments')
export class CommentsController {
    constructor(
        private commentsService: CommentsService
    ){

    }

    @Get('')
    public async getAll(@Query('states') states:string) {
        try {
            let auxStates = [];
            if (states) auxStates = states.split(',')
            return await this.commentsService.getAll(auxStates);
        } catch (error) {
            return error
        }
    }

    @Get('/:commentid')
    public async getById(@Param('commentid') commentid:string) {
        try {
            return await this.commentsService.getById(commentid);
        } catch (error) {
            return error
        }
    }

    @Get('/:postid')
    public async getByPostId(@Param('postid') postid:string, @Query('onlyapproved') onlyapproved:boolean) {
        try {
            return await this.commentsService.getAllbyPosts(postid, onlyapproved);
        } catch (error) {
            return error
        }
    }

    @Post()
    public async create(@Body() body: comment): Promise<comment> {
        try {
            return await this.commentsService.createComment(body);
        }
        catch (error) {
            return error
        }
    }

    @Post('/changeState')
    public changeState(@Body() body: {id: string, estado: ESTADO}): Promise<comment> {
        try {
            return this.commentsService.changeState(body.id, body.estado)
        }
        catch (error) {
            return error
        }
    }

    @Post('/deleteComment/:id')
    public deleteComment(@Param('id') id: string): Promise<boolean> {
        try {
            return this.commentsService.delete(id)
        }
        catch (error) {
            return error
        }
    }
}
