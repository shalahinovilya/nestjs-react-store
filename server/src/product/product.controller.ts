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

    @Get('get-product/:id')
    @ApiParam({name: 'id', description: 'product id'})
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
    async getOne(@Param('id') id): Promise<Product> {
        return await this.productService.getOne(id)
    }

    @UseGuards(AuthGuard)
    @Put('update-product/:id')
    @UseInterceptors(FileInterceptor('img'))
    @ApiParam({name: 'id', description: 'product id'})
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
    async updateProduct( @Param('id') id,
                         @Body() updateCatDto: UpdateProductDto,
                         @UploadedFile() file): Promise<Product>  {

        return await this.productService.updateProduct(id, updateCatDto, file)
    }

    @UseGuards(AuthGuard)
    @Delete('delete-product/:id')
    @ApiParam({name: 'id', description: 'product id'})
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
    async deleteProduct(@Param('id') id): Promise<Product> {
        return await this.productService.deleteProduct(id)
    }

    @Get('get-total-products-num')
    @ApiResponse({
        status: 200,
        description: 'get total products num',
        type: Number
    })
    @ApiResponse({
        status: 400,
        description: 'Bad request'
    })
    @ApiResponse({
        status: 404,
        description: 'Not found'
    })
    async getTotalProductsNum(){
        return await this.productService.getTotalProductsNum()
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



