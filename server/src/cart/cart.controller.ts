import {Controller, Get, Query, UseGuards} from "@nestjs/common";
import {CartService} from "./cart.service";
import {AuthGuard} from "../auth/auth-jwt.guard";
import {ApiQuery, ApiResponse, ApiTags} from "@nestjs/swagger";
import {Cart} from "./cart.entity";
import {CartProduct} from "../cart-product/cart-product.entity";


@ApiTags('cart')
@Controller('cart')
export class CartController {

    constructor(private cartService: CartService) {
    }

    @UseGuards(AuthGuard)
    @Get('get-cart')
    @ApiQuery({name: 'userId', description: 'user id'})
    @ApiResponse({
        status: 200,
        description: 'get cart by user id',
        type: Cart
    })
    @ApiResponse({
        status: 401,
        description: 'Unauthorized'
    })
    @ApiResponse({
        status: 400,
        description: 'Bad request'
    })
    async getCartByUserId(@Query('userId') userId) {
        return await this.cartService.getCartByUserId(userId)
    }

    @UseGuards(AuthGuard)
    @Get('create-cart')
    @ApiQuery({name: 'userId', description: 'user id'})
    @ApiResponse({
        status: 200,
        description: 'get or create cart by user id',
        type: Cart
    })
    @ApiResponse({
        status: 401,
        description: 'Unauthorized'
    })
    @ApiResponse({
        status: 400,
        description: 'Bad request'
    })
    async getOrCreateCart(@Query('userId') userId) {
        return await this.cartService.getOrCreateCart(userId)
    }

    @UseGuards(AuthGuard)
    @Get('get-all-from-cart')
    @ApiQuery({name: 'userId', description: 'user id'})
    @ApiResponse({
        status: 200,
        description: 'get all from cart by user id',
        type: Cart
    })
    @ApiResponse({
        status: 401,
        description: 'Unauthorized'
    })
    @ApiResponse({
        status: 400,
        description: 'Bad request'
    })
    async getAllFromCartByUserId(@Query('userId') userId) {
        return await this.cartService.GetAllFromCartByUserId(userId)
    }

    @UseGuards(AuthGuard)
    @Get('add-to-cart')
    @ApiQuery({name: 'userId', description: 'user id'})
    @ApiQuery({name: 'productId', description: 'product id'})
    @ApiQuery({name: 'finalPrice', description: 'final price'})
    @ApiResponse({
        status: 200,
        description: 'add product to cart',
        type: Cart
    })
    @ApiResponse({
        status: 401,
        description: 'Unauthorized'
    })
    @ApiResponse({
        status: 400,
        description: 'Bad request'
    })
    async addToCart(
        @Query('productId') productId,
        @Query('userId') userId,
        @Query('finalPrice') finalPrice) {
        return await this.cartService.addToCart(productId, Number(finalPrice), userId)
    }

    @UseGuards(AuthGuard)
    @Get('delete-from-cart')
    @ApiQuery({name: 'cartProductId', description: 'cartProduct id'})
    @ApiResponse({
        status: 200,
        description: 'del product from cart',
        type: Cart
    })
    @ApiResponse({
        status: 401,
        description: 'Unauthorized'
    })
    @ApiResponse({
        status: 400,
        description: 'Bad request'
    })
    async deleteFromCart(@Query('cartProductId') cartProductId) {
        return await this.cartService.deleteFromCart(cartProductId)
    }

    @UseGuards(AuthGuard)
    @Get('change-cart-product-qty')
    @ApiQuery({name: 'cartProductId', description: 'cartProduct id'})
    @ApiQuery({name: 'quantity', description: 'cartProduct quantity'})
    @ApiQuery({name: 'productPrice', description: 'product price'})
    @ApiResponse({
        status: 200,
        description: 'change cartProduct quantity',
        type: CartProduct
    })
    @ApiResponse({
        status: 401,
        description: 'Unauthorized'
    })
    @ApiResponse({
        status: 400,
        description: 'Bad request'
    })
    async changeCartProductQuantity(
        @Query('cartProductId') cartProductId,
        @Query('quantity') quantity,
        @Query('productPrice') productPrice)
        {
        return await this.cartService.changeCartProductQuantity(cartProductId, quantity, productPrice)
    }

    @UseGuards(AuthGuard)
    @Get('change-cart-final-price')
    @ApiQuery({name: 'userId', description: 'user id'})
    @ApiQuery({name: 'finalPrice', description: 'final price'})
    @ApiResponse({
        status: 200,
        description: 'change cart final price',
        type: Cart
    })
    @ApiResponse({
        status: 401,
        description: 'Unauthorized'
    })
    @ApiResponse({
        status: 400,
        description: 'Bad request'
    })
    async changeCartFinalPrice(
        @Query('userId') userId,
        @Query('finalPrice') finalPrice) {
        return await this.cartService.changeCartFinalPrice(userId, finalPrice)
    }

}