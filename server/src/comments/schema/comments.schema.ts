import { Schema } from 'mongoose';

export const CommentsSchema = new Schema ({
    postId: {type: String},
    author: {type: String},
    email: {type: String},
    msg: {type: String},
    state: {type: String},
}, {timestamps: true});
