import {IsNumber, IsPhoneNumber, IsString, Length} from "class-validator";

export class CreateOrderDto {

    @IsString({message: 'must be a string'})
    @Length(5, 50, {message: 'must be longer than or equal to 5 characters'})
    firstName: string;

    @IsString({message: 'must be a string'})
    @Length(5, 50, {message: 'must be longer than or equal to 5 characters'})
    lastName: string;

    @IsPhoneNumber('UA', {message: 'wrong UA phone number'})
    @IsString({message: 'property must be a string'})
    phone: string;

    @IsString()
    address: string;

    @IsString()
    buyingType: string;

    @IsString()
    comment?: string;

    @IsNumber()
    userId: number
}