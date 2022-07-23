import {
    Controller,
    Get,
    Post,
    Put,
    Delete,
    Body,
    Param,
    Query,
    UseInterceptors,
    UploadedFile,
    UseGuards,
    Req
} from '@nestjs/common';
import {FileInterceptor} from "@nestjs/platform-express";
import {ProductService} from "./product.service";
import {CreateProductDto} from "./dto/create-product.dto";
import {Product} from "./product.entity";
import {UpdateProductDto} from "./dto/update-product.dto";
import {AuthGuard} from "../auth/auth-jwt.guard";
import {Category} from "../category/category.entity";

@Controller('product')
export class ProductController {

    constructor(private productService: ProductService) {}

    @UseGuards(AuthGuard)
    @Post('create-product')
    @UseInterceptors(FileInterceptor('img'))
    async create(
        @Body() createProductDto: CreateProductDto,
        @UploadedFile() file: Express.Multer.File): Promise<Product> {
        return await this.productService.createProduct(createProductDto, file);

    }

    @Get('get-product/:id')
    async getOne(@Param('id') id): Promise<Product> {
        return await this.productService.getOne(id)
    }

    @UseGuards(AuthGuard)
    @Put('update-product/:id')
    @UseInterceptors(FileInterceptor('img'))
    async updateProduct( @Param('id') id,
                         @Body() updateCatDto: UpdateProductDto,
                         @UploadedFile() file): Promise<Product>  {

        return await this.productService.updateProduct(id, updateCatDto, file)
    }

    @UseGuards(AuthGuard)
    @Delete('delete-product/:id')
    async deleteProduct(@Param('id') id): Promise<Product> {
        return await this.productService.deleteProduct(id)
    }

    @Get('get-all-products')
    async findAll(): Promise<Product[]> {
        return await this.productService.findAll()
    }

    @Get('get-total-products-num')
    async getTotalProductsNum(){
        return await this.productService.getTotalProductsNum()
    }

    @Get('get-products')
    async getProducts(@Req() req){
        return await this.productService.getProducts(req)
    }

}



