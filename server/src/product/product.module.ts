import { Module } from '@nestjs/common';
import {ProductProvider} from "./product.providers";
import {ProductService} from "./product.service";
import {ProductController} from "./product.controller";
import {FileModule} from "../file/file.module";
import {AuthModule} from "../auth/auth.module";


@Module({
    imports: [
        FileModule,
        AuthModule,
    ],
    providers: [
        ProductService,
        ...ProductProvider,
    ],
    controllers: [
        ProductController,
    ],
})

export class ProductModule {}