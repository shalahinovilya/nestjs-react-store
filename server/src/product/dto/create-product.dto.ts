import {ApiProperty, ApiPropertyOptional} from "@nestjs/swagger";

export class CreateProductDto {

    @ApiProperty()
    title: string;

    @ApiProperty()
    description: string;

    @ApiProperty()
    price: number;

    @ApiProperty()
    userId: number;

    @ApiProperty()
    categoryId: number;

    @ApiPropertyOptional()
    img?: string;
}