import {Module} from "@nestjs/common";
import {OrderController} from "./order.controller";
import {OrderService} from "./order.service";
import {OrderProvider} from "./order.providers";
import {CartModule} from "../cart/cart.module";
import {AuthModule} from "../auth/auth.module";

@Module({
    imports: [
        CartModule,
        AuthModule,
    ],
    controllers: [
        OrderController,
    ],
    providers: [
        OrderService,
        ...OrderProvider,
    ],
    exports: [

    ],
})

export class OrderModule {}