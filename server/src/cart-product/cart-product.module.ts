import {Module} from "@nestjs/common";
import {CartProductService} from "./cart-product.service";
import {CartProductProvider} from "./cart-product.providers";


@Module({
    imports: [

    ],
    controllers: [

    ],
    providers: [
        CartProductService,
        ...CartProductProvider,
    ],
    exports: [
        CartProductService,
    ]
})

export class CartProductModule {}