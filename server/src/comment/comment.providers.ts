import {Comment} from "./comment.entity";

export const CommentProvider = [
    {
        provide: 'COMMENT_PROVIDER',
        useValue: Comment
    }
]