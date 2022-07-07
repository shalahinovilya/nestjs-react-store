import {Cart} from "./cart.entity";

export const CartProvider = [
    {
        provide: 'CART_REPOSITORY',
        useValue: Cart
    }
]

