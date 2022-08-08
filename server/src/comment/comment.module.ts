import {Module} from "@nestjs/common";
import {CommentController} from "./comment.controller";
import {CommentProvider} from "./comment.providers";
import {CommentService} from "./comment.service";
import {AuthModule} from "../auth/auth.module";


@Module({

    imports: [
        AuthModule,
    ],

    controllers: [
        CommentController,
    ],

    providers: [
        CommentService,
        ...CommentProvider,
    ],

    exports: [

    ],

})

export class CommentModule {}