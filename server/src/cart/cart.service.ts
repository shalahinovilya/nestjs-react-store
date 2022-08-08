import {Inject, Injectable} from "@nestjs/common";
import {Cart} from "./cart.entity";
import {CartProductService} from "../cart-product/cart-product.service";


@Injectable()
export class CartService {

    constructor(@Inject('CART_REPOSITORY')
    private cartRepository: typeof Cart,
    private cartProductService: CartProductService,
    ) {}


    async getOrCreateCart(userId) {
        let cart = await this.getCartByUserId(userId)
        if (cart) return cart
        return this.cartRepository.create({userId})
    }


    async deleteFromCart(cartProductId) {
        return await this.cartProductService.deleteCartProduct(cartProductId)
    }


    async getCartByUserId(userId) {
        return this.cartRepository.findOne({where: {userId: userId, inOrder: false}})
    }


    async GetAllFromCartByUserId(userId) {
        const cart = await this.getOrCreateCart(userId)
        return await this.cartProductService.getAllCartProductsFromCart(cart.id)
    }


    async addToCart(productId, finalPrice, userId) {
        const cart = await this.getOrCreateCart(userId)
        return await this.cartProductService.createCartProduct(productId, finalPrice, cart.id)
    }


    async makeCartIsOrder(cartId) {
        await this.cartRepository.update({inOrder: true}, {where: {id: cartId}})
    }


    async changeCartProductQuantity(cartProductId, quantity, productPrice) {
        return await this.cartProductService.changeCartProductQuantity(cartProductId, +quantity, productPrice)
    }


    async changeCartFinalPrice(userId, finalPrice) {
        const cart = await this.getOrCreateCart(userId)
        await cart.update({finalPrice}, {where: {id: cart.id}})
        return cart
    }

}
