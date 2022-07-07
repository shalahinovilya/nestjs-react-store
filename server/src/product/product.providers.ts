import {Product} from "./product.entity";

export const ProductProvider = [
    {
        provide: 'PRODUCT_REPOSITORY',
        useValue: Product
    },
]