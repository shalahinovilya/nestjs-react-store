import {Controller, Post, Body, Req, UseGuards, Get} from '@nestjs/common';
import {AuthService} from "./auth.service";
import {CreateUserDto} from "../user/dto/create-user.dto";
import {LoginUserDto} from "./dto/login-user.dto";
import {AuthGuard} from "./auth-jwt.guard";


@Controller()
export class AuthController {
    constructor(private authService: AuthService) {}

    @Post('login')
    async login(@Body() loginUserDto: LoginUserDto) {
        return await this.authService.login(loginUserDto)
    }

    @Post('register')
    async register(@Body() createUserDto: CreateUserDto) {
        return await this.authService.register(createUserDto)
    }

    @UseGuards(AuthGuard)
    @Get('check')
    async checkAuth(@Req() req) {
        return await this.authService.checkAuth(req.user)
    }

}
