import {IsString, Length} from "class-validator";
import {ApiProperty} from "@nestjs/swagger";

export class UpdateCommentDto {

    @IsString()
    @Length(5, 20, {message: 'must be longer than or equal to 5 characters'})
    @ApiProperty()
    limitations: string;

    @IsString()
    @Length(5, 20, {message: 'must be longer than or equal to 5 characters'})
    @ApiProperty()
    advantages: string;

    @IsString()
    @Length(10, 100, {message: 'must be longer than or equal to 100 characters'})
    @ApiProperty()
    content: string;

    @ApiProperty()
    userId: number;

    @ApiProperty()
    productId: number;
}