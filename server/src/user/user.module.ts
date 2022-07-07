import {forwardRef, Module} from '@nestjs/common';
import {UserController} from "./user.controller";
import {UserProviders} from "./user.providers";
import {UserService} from "./user.service";
import {AuthModule} from "../auth/auth.module";
import {CartModule} from "../cart/cart.module";

@Module({
    imports: [
        forwardRef(() => AuthModule),
        CartModule,
    ],
    providers: [
        UserService,
        ...UserProviders,
    ],
    controllers: [
        UserController,
    ],
    exports: [
        UserService,
    ]
})

export class UserModule {}