import { BadGatewayException, ForbiddenException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { comment } from 'src/interfaces/comment.interface';
import { ESTADO } from 'src/interfaces/posts.interface';

@Injectable()
export class CommentsService {
    constructor(
        @InjectModel('comments') private comments: Model <comment>,
    ){    
    }

    getAll(filterState: ESTADO[]): Promise<comment[]> {
        return new Promise(async (resolve, rejects) => {
            try {
                const filters: any = {};
                if (Array.isArray(filterState) && filterState.length > 0) filters.state = {"$in": filterState};
                const comments = await this.comments.find(filters).lean();
                if (!Array.isArray(comments)) return rejects({message: 'Error on find'});
                return resolve(comments);
            } catch (error) {
                return rejects(error);
            }
        });
    };

    getAllbyPosts(postId: string, onlyAproved): Promise<comment[]> {
        return new Promise(async (resolve, rejects) => {
            try {
                if (!postId) return rejects({message: 'Id not include'});
                const filters: any = {
                    postId: postId
                };
                if (onlyAproved) filters.state = {"$in": [ESTADO.aprobado]};
                const comments = await this.comments.find(filters).lean();
                if (!Array.isArray(comments)) return rejects({message: 'Error on find'});
                return resolve(comments);
            } catch (error) {
                return rejects(error);
            }
        });
    };

    getById(commentId: string): Promise<comment[]> {
        return new Promise(async (resolve, rejects) => {
            try {
                if (!commentId) return rejects({message: 'Id not include'});
                const comments = await this.comments.findById(commentId).lean();
                if (!Array.isArray(comments)) return rejects({message: 'Error on find'});
                return resolve(comments);
            } catch (error) {
                return rejects(error);
            }
        });
    };

    changeState(commentId: string, state: ESTADO): Promise<comment> {
        return new Promise (async (resolve, rejects) => {
            try {
                if (!commentId || !state) return rejects(new BadGatewayException('id or state not include'));
                let response = await this.comments.findByIdAndUpdate(commentId, {state: state});
                if (!response) return rejects(new ForbiddenException('Post not found'));
                return resolve(response);
            } catch (error) {
                return rejects(error)
            }
        });
    }

    createComment(newComment: comment): Promise<comment> {
        return new Promise (async (resolve, rejects) => {
            try {
                if(!newComment.postId || !newComment.msg || !newComment.email) return rejects({message: 'Error en parametros de entrada.'});
                const comment: comment = {
                    author: newComment.author || 'Anonimo',
                    msg: newComment.msg,
                    email: newComment.email,
                    postId: newComment.postId,
                    state: ESTADO.pendiente 
                }
                const res = await this.comments.create(comment);
                if(!res) return rejects({message: 'Error al subir comentario.'});
                return resolve(res);
            } catch (error) {
                return rejects(error);
            }
        });
    }

    public async delete(commentId: string): Promise <boolean> {
        return new Promise(async (resolve, rejects) => {
            try {
                if (!commentId) return rejects(new BadGatewayException('id not include'));
                let response = await this.comments.deleteOne({_id: commentId});
                if(!response) return rejects(new NotFoundException('Post not found'));
                return resolve(response ? true : false);
            } catch (error) {
                return rejects(error)
            }
        });
    }
}
