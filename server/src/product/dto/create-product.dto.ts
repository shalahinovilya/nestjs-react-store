import {ApiProperty, ApiPropertyOptional} from "@nestjs/swagger";
import {IsNumber, IsString, Length} from "class-validator";

export class CreateProductDto {

    @IsString()
    @Length(6, 20, {message: 'must be longer than or equal to 6 characters'})
    @ApiProperty()
    title: string;

    @IsString()
    @Length(10, 200, {message: 'must be longer than or equal to 10 characters'})
    @ApiProperty()
    description: string;

    @ApiProperty()
    price: number;

    @ApiProperty()
    userId: number;

    @ApiProperty()
    categoryId: number;

    @IsString()
    @ApiPropertyOptional()
    img?: string;
}