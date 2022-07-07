import {Controller, Get, Post, Body, Param, UseGuards} from '@nestjs/common';
import {CategoryService} from "./category.service";
import {CreateCategoryDto} from "./dto/create-category.dto";
import {Category} from "./category.entity";
import {AuthGuard} from "../auth/auth-jwt.guard";

@Controller('category')
export class CategoryController {

    constructor(private categoryService: CategoryService) {}

    @UseGuards(AuthGuard)
    @Post('create-category')
    async createCategory(@Body() createCategoryDto: CreateCategoryDto): Promise<Category> {
        return await this.categoryService.createCategory(createCategoryDto)
    }

    @Get('get-category/:id')
    async getCategory(@Param('id') id): Promise<Category> {
        return await this.categoryService.getCategory(id)
    }

    @Get('get-all-categories')
    async getAllCategories(): Promise<Category[]> {
        return await this.categoryService.getAllCategories()
    }

    @Get('get-all-by-category')
    async getAllByCategory(): Promise<Category[]> {
        return await this.categoryService.getAllCategories()
    }

}