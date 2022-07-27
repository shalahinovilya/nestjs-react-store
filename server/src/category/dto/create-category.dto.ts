import {ApiProperty} from "@nestjs/swagger";

export class CreateCategoryDto {

    @ApiProperty()
    value: string;

    @ApiProperty()
    description: string;
}