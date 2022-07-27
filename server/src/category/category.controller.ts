import {Controller, Get, Post, Body, Param, UseGuards} from '@nestjs/common';
import {CategoryService} from "./category.service";
import {CreateCategoryDto} from "./dto/create-category.dto";
import {Category} from "./category.entity";
import {AuthGuard} from "../auth/auth-jwt.guard";
import {ApiBody, ApiParam, ApiResponse, ApiTags} from "@nestjs/swagger";


@ApiTags('category')
@Controller('category')
export class CategoryController {

    constructor(private categoryService: CategoryService) {}

    @UseGuards(AuthGuard)
    @Post('create-category')
    @ApiBody({type: CreateCategoryDto})
    @ApiResponse({
        status: 201,
        description: 'get category',
        type: Category
    })
    @ApiResponse({
        status: 401,
        description: 'Unauthorized'
    })
    @ApiResponse({
        status: 400,
        description: 'Bad request'
    })
    async createCategory(@Body() createCategoryDto: CreateCategoryDto): Promise<Category> {
        return await this.categoryService.createCategory(createCategoryDto)
    }

    @Get('get-category/:id')
    @ApiParam({name: 'id', description: 'category id'})
    @ApiResponse({
        status: 200,
        description: 'get category',
        type: Category
    })
    @ApiResponse({
        status: 400,
        description: 'Bad request'
    })
    async getCategory(@Param('id') categoryId): Promise<Category> {
        return await this.categoryService.getCategory(categoryId)
    }

    @Get('get-all-categories')
    @ApiResponse({
        status: 200,
        description: 'get categories',
        type: [Category]
    })
    async getAllCategories(): Promise<Category[]> {
        return await this.categoryService.getAllCategories()
    }

}