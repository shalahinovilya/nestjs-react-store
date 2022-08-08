import {
    Controller,
    Get,
    Post,
    Put,
    Delete,
    Body,
    Param,
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
import {ApiBody, ApiConsumes, ApiParam, ApiResponse, ApiTags} from "@nestjs/swagger";



@ApiTags('product')
@Controller('product')
export class ProductController {

    constructor(private productService: ProductService) {}

    @UseGuards(AuthGuard)
    @Post('create-product')
    @UseInterceptors(FileInterceptor('img'))
    @ApiConsumes('multipart/form-data')
    @ApiBody({type: CreateProductDto})
    @ApiResponse({
        status: 201,
        description: 'create product',
        type: Product
    })
    @ApiResponse({
        status: 400,
        description: 'Bad request'
    })
    @ApiResponse({
        status: 401,
        description: 'Unauthorized'
    })
    async create(
        @Body() createProductDto: CreateProductDto,
        @UploadedFile() file: Express.Multer.File): Promise<Product> {
        return await this.productService.createProduct(createProductDto, file);

    }


    @UseGuards(AuthGuard)
    @Put('update-product/:productId')
    @UseInterceptors(FileInterceptor('img'))
    @ApiParam({name: 'productId', description: 'product id'})
    @ApiBody({type: UpdateProductDto})
    @ApiResponse({
        status: 200,
        description: 'update product',
        type: Product
    })
    @ApiResponse({
        status: 401,
        description: 'Unauthorized'
    })
    @ApiResponse({
        status: 400,
        description: 'Bad request'
    })
    @ApiResponse({
        status: 404,
        description: 'Not found'
    })
    async updateProduct( @Param('productId') productId,
                         @Body() updateProductDto: UpdateProductDto,
                         @UploadedFile() file): Promise<Product>  {

        return await this.productService.updateProduct(productId, updateProductDto, file)
    }


    @UseGuards(AuthGuard)
    @Delete('delete-product/:productId')
    @ApiParam({name: 'productId', description: 'product id'})
    @ApiResponse({
        status: 200,
        description: 'delete product',
        type: Product
    })
    @ApiResponse({
        status: 401,
        description: 'Unauthorized'
    })
    @ApiResponse({
        status: 400,
        description: 'Bad request'
    })
    @ApiResponse({
        status: 404,
        description: 'Not found'
    })
    async deleteProduct(@Param('productId') productId): Promise<Product> {
        return await this.productService.deleteProduct(productId)
    }


    @Get('get-product/:productId')
    @ApiParam({name: 'productId', description: 'product id'})
    @ApiResponse({
        status: 200,
        description: 'get one product',
        type: Product
    })
    @ApiResponse({
        status: 400,
        description: 'Bad request'
    })
    @ApiResponse({
        status: 404,
        description: 'Not found'
    })
    async getOne(@Param('productId') productId): Promise<Product> {
        return await this.productService.getOne(productId)
    }

    @Get('get-products')
    @ApiResponse({
        status: 200,
        description: 'get products for page',
        type: [Product]
    })
    async getProducts(@Req() req){
        return await this.productService.getProducts(req)
    }

}



