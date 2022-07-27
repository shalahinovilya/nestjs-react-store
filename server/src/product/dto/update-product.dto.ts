import {ApiProperty, ApiPropertyOptional} from "@nestjs/swagger";

export class UpdateProductDto {

    @ApiProperty()
    title: string;

    @ApiProperty()
    description: string;

    @ApiProperty()
    price: number;

    @ApiPropertyOptional()
    img?: string;

    @ApiProperty()
    userId: number;

    @ApiProperty()
    categoryId: number;
}