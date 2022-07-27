import {IsNumber, IsPhoneNumber, IsString, Length} from "class-validator";
import {ApiProperty, ApiPropertyOptional} from "@nestjs/swagger";

export class CreateOrderDto {

    @IsString({message: 'must be a string'})
    @Length(5, 50, {message: 'must be longer than or equal to 5 characters'})
    @ApiProperty({minLength: 5, maxLength: 50})
    firstName: string;

    @IsString({message: 'must be a string'})
    @Length(5, 50, {message: 'must be longer than or equal to 5 characters'})
    @ApiProperty({minLength: 5, maxLength: 50})
    lastName: string;

    @IsPhoneNumber('UA', {message: 'wrong UA phone number'})
    @IsString({message: 'property must be a string'})
    @ApiProperty({description: 'UA numbers'})
    phone: string;

    @IsString()
    @ApiProperty()
    address: string;

    @IsString()
    @ApiProperty()
    buyingType: string;

    @IsString()
    @ApiPropertyOptional()
    comment?: string;

    @IsNumber()
    @ApiProperty()
    userId: number
}