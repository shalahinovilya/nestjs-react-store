import {Controller, Get, Post, Body, Param, UseGuards} from '@nestjs/common';
import {UserService} from "./user.service";
import {CreateUserDto} from "./dto/create-user.dto";
import {User} from "./user.entity";
import {AuthGuard} from "../auth/auth-jwt.guard";


@Controller('user')
export class UserController {

    constructor(private userService: UserService) {}

    @Post('create-user')
    async create(@Body() createUserDto: CreateUserDto): Promise<User> {
        return await this.userService.createUser(createUserDto);

    }

    @Get('get-user/:id')
    async getUserById(@Param('id') id): Promise<User> {
        return await this.userService.getUserById(id)
    }

    @UseGuards(AuthGuard)
    @Get('get-all-users')
    async findAllUsers(): Promise<User[]> {
        return await this.userService.findAllUsers()
    }

}