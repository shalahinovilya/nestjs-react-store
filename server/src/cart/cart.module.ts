import {Module} from "@nestjs/common";
import {CartService} from "./cart.service";
import {CartProvider} from "./cart.providers";
import {CartController} from "./cart.controller";
import {CartProductModule} from "../cart-product/cart-product.module";
import {AuthModule} from "../auth/auth.module";


@Module({
    imports: [
        CartProductModule,
        AuthModule,
    ],
    controllers: [
        CartController,
    ],
    providers: [
        CartService,
        ...CartProvider,
    ],
    exports: [
        CartService,
    ]
})

export class CartModule {}