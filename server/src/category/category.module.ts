import { Module } from '@nestjs/common';
import {CategoryService} from "./category.service";
import {CategoryController} from "./category.controller";
import {CategoryProvider} from "./category.providers";
import {AuthModule} from "../auth/auth.module";


@Module({
    imports: [
        AuthModule,
    ],
    providers: [
        CategoryService,
        ...CategoryProvider,
    ],
    controllers: [
        CategoryController,
    ],
})

export class CategoryModule {}