import {Body, Controller, Get, Inject, Param, Post, UseGuards} from "@nestjs/common";
import {OrderService} from "./order.service";
import {Order} from "./order.entity";
import {CreateOrderDto} from "./dto/create-order.dto";
import {AuthGuard} from "../auth/auth-jwt.guard";
import {ApiBody, ApiParam, ApiResponse, ApiTags} from "@nestjs/swagger";


@ApiTags('order')
@Controller('order')
export class OrderController {
    constructor(@Inject('ORDER_PROVIDER')
                private orderRepository: typeof Order,
                private orderService: OrderService) {}

    @UseGuards(AuthGuard)
    @Post('create-order')
    @ApiBody({type: CreateOrderDto})
    @ApiResponse({
        status: 201,
        description: 'create order',
        type: Order
    })
    @ApiResponse({
        status: 401,
        description: 'Unauthorized'
    })
    @ApiResponse({
        status: 400,
        description: 'Bad request'
    })
    async createOrder (@Body() createOrderDto: CreateOrderDto) {
        return await this.orderService.createOrder(createOrderDto)
    }

    @UseGuards(AuthGuard)
    @Get('get-user-orders/:id')
    @ApiParam({name: 'id', description: 'user id'})
    @ApiResponse({
        status: 200,
        description: 'get orders',
        type: [Order]
    })
    @ApiResponse({
        status: 401,
        description: 'Unauthorized'
    })
    @ApiResponse({
        status: 400,
        description: 'Bad request'
    })
    @ApiResponse({
        status: 404,
        description: 'Not found'
    })
    async getUserOrders (@Param('id') userId) {
        return await this.orderService.getUserOrders(userId)
    }
}