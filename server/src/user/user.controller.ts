import {Controller, Get, Post, Body, Param, UseGuards} from '@nestjs/common';
import {UserService} from "./user.service";
import {CreateUserDto} from "./dto/create-user.dto";
import {User} from "./user.entity";
import {AuthGuard} from "../auth/auth-jwt.guard";
import {ApiBody, ApiParam, ApiResponse, ApiTags} from "@nestjs/swagger";
import {Roles} from "../auth/auth-role.decorator";
import {RoleGuard} from "../auth/role.guard";
import {Role} from "../enums/role.enum";


@ApiTags('user')
@Controller('user')
export class UserController {

    constructor(private userService: UserService) {}


    @Post('create-user')
    @ApiBody({type: CreateUserDto})
    @ApiResponse({
        status: 201,
        description: 'create user',
        type: User
    })
    @ApiResponse({
        status: 400,
        description: 'Bad request'
    })
    async createUser (@Body() createUserDto: CreateUserDto): Promise<User> {
        return await this.userService.createUser(createUserDto);

    }


    @Get('get-user/:userId')
    @ApiParam({name: 'userId', description: 'user id'})
    @ApiResponse({
        status: 200,
        description: 'get user by id',
        type: User
    })
    @ApiResponse({
        status: 404,
        description: 'Not found'
    })
    async getUserById(@Param('userId') userId): Promise<User> {
        return await this.userService.getUserById(userId)
    }

    @Roles(Role.Admin)
    @UseGuards(AuthGuard, RoleGuard)
    @Get('get-all-users')
    @ApiResponse({
        status: 200,
        description: 'get all users',
        type: [User]
    })
    @ApiResponse({
        status: 401,
        description: 'Unauthorized'
    })
    async getAllUsers(): Promise<User[]> {
        return await this.userService.getAllUsers()
    }

}