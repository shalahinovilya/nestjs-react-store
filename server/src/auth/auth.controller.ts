import {Controller, Post, Body, Req, UseGuards, Get} from '@nestjs/common';
import {AuthService} from "./auth.service";
import {CreateUserDto} from "../user/dto/create-user.dto";
import {LoginUserDto} from "./dto/login-user.dto";
import {AuthGuard} from "./auth-jwt.guard";
import {ApiBody, ApiResponse, ApiTags} from "@nestjs/swagger";


@ApiTags('auth')
@Controller()
export class AuthController {
    constructor(private authService: AuthService) {}

    @Post('login')
    @ApiBody({type: LoginUserDto})
    @ApiResponse({
        status: 200,
        description: 'login user and return token',
        type: String
    })
    async login(@Body() loginUserDto: LoginUserDto) {
        return await this.authService.login(loginUserDto)
    }


    @Post('register')
    @ApiBody({type: CreateUserDto})
    @ApiResponse({
        status: 200,
        description: 'register user and return token',
        type: String
    })
    async register(@Body() createUserDto: CreateUserDto) {
        return await this.authService.register(createUserDto)
    }


    @UseGuards(AuthGuard)
    @Get('check')
    async checkAuth(@Req() req) {
        return await this.authService.checkAuth(req.user)
    }

}
