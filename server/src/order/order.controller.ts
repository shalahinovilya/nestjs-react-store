import {Body, Controller, Get, Inject, Post, Query, UseGuards} from "@nestjs/common";
import {OrderService} from "./order.service";
import {Order} from "./order.entity";
import {CreateOrderDto} from "./dto/create-order.dto";
import {AuthGuard} from "../auth/auth-jwt.guard";


@Controller('order')
export class OrderController {
    constructor(@Inject('ORDER_PROVIDER')
                private orderRepository: typeof Order,
                private orderService: OrderService) {}

    @UseGuards(AuthGuard)
    @Post('create-order')
    async createOrder (@Body() createOrderDto: CreateOrderDto) {
        return await this.orderService.createOrder(createOrderDto)
    }

    @UseGuards(AuthGuard)
    @Get('get-user-orders')
    async getUserOrders (@Query('userId') userId) {
        return await this.orderService.getUserOrders(userId)
    }
}