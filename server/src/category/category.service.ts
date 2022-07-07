import { Injectable, Inject } from '@nestjs/common';
import {Category} from "./category.entity";
import {CreateCategoryDto} from "./dto/create-category.dto";

@Injectable()
export class CategoryService {
    constructor(
        @Inject('CATEGORY_REPOSITORY')
        private categoryRepository: typeof Category) {}

    async createCategory(dto: CreateCategoryDto): Promise<Category> {
        return await this.categoryRepository.create(dto)
    }

    async getCategory(categoryId): Promise<Category> {
        return await this.categoryRepository.findByPk(categoryId)
    }

    async getAllCategories(): Promise<Category[]> {
        return await this.categoryRepository.findAll()
    }
}