import {Inject, Injectable} from "@nestjs/common";
import {CreateCommentDto} from "./dto/create-comment.dto";
import {Comment} from "./comment.entity";
import {User} from "../user/user.entity";
import {UpdateCommentDto} from "./dto/update-comment.dto";

@Injectable()
export class CommentService {

    constructor(@Inject('COMMENT_PROVIDER')
                 private commentRepository: typeof Comment) {
    }


    async createComment (dto: CreateCommentDto): Promise<Comment> {
        return await this.commentRepository.create({
            content: dto.content,
            advantages: dto.advantages,
            limitations: dto.limitations,
            userId: dto.userId,
            productId: dto.productId})
    }


    async updateComment (commentId, dto: UpdateCommentDto) {
        return await this.commentRepository.update(
            {
                advantages: dto.advantages,
                limitations: dto.limitations,
                content: dto.content
            },
            {where: {id: commentId}})
    }


    async deleteComment (commentId) {
        return await this.commentRepository.destroy({where: {id: commentId}})
    }

    async getComment (commentId): Promise<Comment> {
        return await this.commentRepository.findByPk(commentId)
    }


    async getAllUserComments (userId): Promise<Comment[]> {
        return await this.commentRepository.findAll({where: {userId}})
    }


    async getAllProductComments (productId): Promise<Comment[]> {
        return await this.commentRepository.findAll(
            {
                where: {productId},
                include: [
                {model: User,
                attributes: ['id', 'username']}
                ]}
        )
    }

}