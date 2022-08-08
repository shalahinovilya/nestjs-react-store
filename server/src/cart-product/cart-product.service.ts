import {Inject, Injectable} from "@nestjs/common";
import {CartProduct} from "./cart-product.entity";


@Injectable()
export class CartProductService {

    constructor(
        @Inject('CART_PRODUCT_REPOSITORY')
        private cartProductProvider: typeof CartProduct) {
    }


    async createCartProduct(productId, finalPrice, cartId): Promise<CartProduct> {
        return await this.cartProductProvider.create({productId, finalPrice, cartId})
    }


    async deleteCartProduct(cartProductId) {
        return await this.cartProductProvider.destroy({where : {id: cartProductId}})
    }


    async getCartProduct(id): Promise<CartProduct> {
        return await this.cartProductProvider.findByPk(id)
    }


    async getAllCartProductsFromCart(cartId) {
        return await this.cartProductProvider.findAndCountAll({where: {cartId}, order: [['id', 'DESC']]})
    }


    async calcCartProductFinalPrice(productPrice, quantity) {
        return productPrice * quantity
    }


    async changeCartProductQuantity(cartProductId, quantity, productPrice) {
        const cartProduct = await this.getCartProduct(cartProductId)
        const finalPrice = await this.calcCartProductFinalPrice(productPrice, quantity)
        await cartProduct.update({quantity, finalPrice})
        return await cartProduct.save()
    }

}