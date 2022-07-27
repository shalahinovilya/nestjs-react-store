import {IsEmail, IsString, Length} from "class-validator";
import {ApiProperty} from "@nestjs/swagger";

export class CreateUserDto {

    @IsEmail({}, {message: 'email must be an email (user@gmail.com)'})
    @ApiProperty()
    email: string;

    @IsString( {message: 'must be a string'})
    @Length(6, 15, {message: 'must be longer than or equal to 6 characters'})
    @ApiProperty({minLength: 6, maxLength: 15})
    username: string;

    @IsString({message: 'must be a string'})
    @Length(6, 20, {message: 'must be longer than or equal to 6 characters'})
    @ApiProperty({minLength: 6, maxLength: 20})
    password: string;
}