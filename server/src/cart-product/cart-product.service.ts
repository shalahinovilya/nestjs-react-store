import {Inject, Injectable} from "@nestjs/common";
import {CartProduct} from "./cart-product.entity";


@Injectable()
export class CartProductService {

    constructor(
        @Inject('CART_PRODUCT_REPOSITORY')
        private cartProductProvider: typeof CartProduct) {
    }

    async createCartProduct(productId, finalPrice, cartId) {
        const cartProduct = await this.cartProductProvider.create({productId, finalPrice, cartId})
        return cartProduct
    }

    async getCartProduct(id) {
        const cartProduct = await this.cartProductProvider.findByPk(id)
        return cartProduct
    }

    async deleteCartProduct(cartProductId) {
        return await this.cartProductProvider.destroy({where : {id: cartProductId}})
    }

    async getAllCartProductsFromCart(cartId) {
        return await this.cartProductProvider.findAndCountAll({where: {cartId}, order: [['id', 'DESC']]})
    }

    async calcCartProductFinalPrice(productPrice, quantity) {
        console.log(productPrice, quantity)
        return productPrice * quantity
    }

    async changeCartProductQuantity(cartProductId, quantity, productPrice) {
        const cartProduct = await this.getCartProduct(cartProductId)
        const finalPrice = await this.calcCartProductFinalPrice(productPrice, quantity)
        await cartProduct.update({quantity, finalPrice})
        return await cartProduct.save()
    }
}