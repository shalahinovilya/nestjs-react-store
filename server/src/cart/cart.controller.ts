import {Controller, Get, Query, UseGuards} from "@nestjs/common";
import {CartService} from "./cart.service";
import {AuthGuard} from "../auth/auth-jwt.guard";


@Controller('cart')
export class CartController {

    constructor(private cartService: CartService) {
    }

    @UseGuards(AuthGuard)
    @Get('get-cart')
    async getCartByUserId(@Query('userId') userId) {
        return await this.cartService.getCartByUserId(userId)
    }

    @UseGuards(AuthGuard)
    @Get('create-cart')
    async getOrCreateCart(@Query('userId') userId) {
        return await this.cartService.getOrCreateCart(userId)
    }

    @UseGuards(AuthGuard)
    @Get('get-all-from-cart')
    async getAllFromCartByUserId(@Query('userId') userId) {
        return await this.cartService.GetAllFromCartByUserId(userId)
    }

    @UseGuards(AuthGuard)
    @Get('add-to-cart')
    async addToCart(
        @Query('productId') productId,
        @Query('userId') userId,
        @Query('finalPrice') finalPrice) {
        return await this.cartService.addToCart(productId, Number(finalPrice), userId)
    }

    @UseGuards(AuthGuard)
    @Get('delete-from-cart')
    async deleteFromCart(@Query('cartProductId') cartProductId) {
        return await this.cartService.deleteFromCart(cartProductId)
    }

    @UseGuards(AuthGuard)
    @Get('change-cart-product-qty')
    async changeCartProductQuantity(
        @Query('cartProductId') cartProductId,
        @Query('quantity') quantity,
        @Query('productPrice') productPrice)
        {
        return await this.cartService.changeCartProductQuantity(cartProductId, quantity, productPrice)
    }

    @UseGuards(AuthGuard)
    @Get('change-cart-final-price')
    async changeCartFinalPrice(
        @Query('userId') userId,
        @Query('finalPrice') finalPrice) {
        return await this.cartService.changeCartFinalPrice(userId, finalPrice)
    }

}