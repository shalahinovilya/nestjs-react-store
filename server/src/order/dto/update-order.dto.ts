import {IsString, Length} from "class-validator";
import {ApiProperty} from "@nestjs/swagger";

export class UpdateOrderDto {

    @IsString({message: 'must be a string'})
    @Length(5, 20, {message: 'must be longer than or equal to 5 characters'})
    @ApiProperty({minLength: 5, maxLength: 20})
    firstName: string;

    @IsString({message: 'must be a string'})
    @Length(5, 20, {message: 'must be longer than or equal to 5 characters'})
    @ApiProperty({minLength: 5, maxLength: 20})
    lastName: string;

    @IsString({message: 'property must be a string'})
    @ApiProperty({description: 'phone number'})
    phone: string;

    @IsString()
    @Length(10, 50, {message: 'must be longer than or equal to 10 characters'})
    @ApiProperty()
    address: string;

    @IsString()
    @ApiProperty()
    buyingType: string;
}