import { ESTADO } from "./posts.interface";

export interface comment {
    postId: string,
    author: string,
    email: string,
    msg: string,
    state: ESTADO,
};

export interface commentVM extends Omit <comment, "email">{
    _id: string,
    createdAt: Date,
}