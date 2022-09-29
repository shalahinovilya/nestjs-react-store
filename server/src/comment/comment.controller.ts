import {Body, Controller, Delete, Get, Param, Post, Put, UseGuards} from "@nestjs/common";
import {CommentService} from "./comment.service";
import {CreateCommentDto} from "./dto/create-comment.dto";
import {Comment} from "./comment.entity";
import {AuthGuard} from "../auth/auth-jwt.guard";
import {UpdateCommentDto} from "./dto/update-comment.dto";
import {ApiBody, ApiParam, ApiResponse, ApiTags} from "@nestjs/swagger";


@ApiTags('comment')
@Controller('comment')
export class CommentController {

    constructor(
      private commentService: CommentService,
    ) {}


    @UseGuards(AuthGuard)
    @Post('create-comment')
    @ApiBody({type: CreateCommentDto})
    @ApiResponse({
        status: 201,
        description: 'create comment',
        type: Comment
    })
    @ApiResponse({
        status: 400,
        description: 'Bad request'
    })
    @ApiResponse({
        status: 401,
        description: 'Unauthorized'
    })
    async createComment (@Body() createCommentDto: CreateCommentDto): Promise<Comment> {
        return await this.commentService.createComment(createCommentDto)
    }


    @UseGuards(AuthGuard)
    @Put('update-comment/:commentId')
    @ApiParam({name: 'commentId', description: 'comment id'})
    @ApiBody({type: UpdateCommentDto})
    @ApiResponse({
        status: 200,
        description: 'update comment',
        type: Comment
    })
    @ApiResponse({
        status: 400,
        description: 'Bad request'
    })
    @ApiResponse({
        status: 401,
        description: 'Unauthorized'
    })
    @ApiResponse({
        status: 404,
        description: 'Not found'
    })
    async updateComment (
        @Param('commentId') commentId,
        @Body() updateCommentDto: UpdateCommentDto) {
        return await this.commentService.updateComment(commentId, updateCommentDto)
    }


    @UseGuards(AuthGuard)
    @Delete('delete-comment/:commentId')
    @ApiParam({name: 'commentId', description: 'comment id'})
    @ApiResponse({
        status: 200,
        description: 'delete comment',
    })
    @ApiResponse({
        status: 401,
        description: 'Unauthorized'
    })
    @ApiResponse({
        status: 400,
        description: 'Bad request'
    })
    @ApiResponse({
        status: 404,
        description: 'Not found'
    })
    async deleteComment (@Param('commentId') commentId) {
        return await this.commentService.deleteComment(commentId)
    }


    @Get('get-comment/:commentId')
    @ApiParam({name: 'commentId', description: 'comment id'})
    @ApiResponse({
        status: 200,
        description: 'get product',
        type: Comment
    })
    @ApiResponse({
        status: 400,
        description: 'Bad request'
    })
    @ApiResponse({
        status: 404,
        description: 'Not found'
    })
    async getComment (@Param('commentId') commentId): Promise<Comment> {
        return await this.commentService.getComment(commentId)
    }


    @Get('get-user-comments/:userId')
    @ApiParam({name: 'userId', description: 'user id'})
    @ApiResponse({
        status: 200,
        description: 'get user comments',
        type: Comment
    })
    @ApiResponse({
        status: 400,
        description: 'Bad request'
    })
    @ApiResponse({
        status: 404,
        description: 'Not found'
    })
    async getAllUserComments (@Param('userId') userId): Promise<Comment[]> {
        return await this.commentService.getAllUserComments(userId)
    }


    @Get('get-product-comments/:productId')
    @ApiParam({name: 'productId', description: 'product id'})
    @ApiResponse({
        status: 200,
        description: 'get product comments',
        type: Comment
    })
    @ApiResponse({
        status: 400,
        description: 'Bad request'
    })
    @ApiResponse({
        status: 404,
        description: 'Not found'
    })
    async getAllProductComments (@Param('productId') productId): Promise<Comment[]> {
        return await this.commentService.getAllProductComments(productId)
    }

}