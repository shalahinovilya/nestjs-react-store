import {CartProduct} from "./cart-product.entity";

export const CartProductProvider = [
    {
        provide: 'CART_PRODUCT_REPOSITORY',
        useValue: CartProduct,
    }
]