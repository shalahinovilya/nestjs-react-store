import {Body, Controller, Delete, Get, Inject, Param, Post, Put, UseGuards} from "@nestjs/common";
import {OrderService} from "./order.service";
import {Order} from "./order.entity";
import {CreateOrderDto} from "./dto/create-order.dto";
import {AuthGuard} from "../auth/auth-jwt.guard";
import {ApiBody, ApiParam, ApiResponse, ApiTags} from "@nestjs/swagger";
import {Roles} from "../auth/auth-role.decorator";
import {Role} from "../enums/role.enum";
import {RoleGuard} from "../auth/role.guard";
import {User} from "../user/user.entity";
import {UpdateOrderDto} from "./dto/update-order.dto";


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
    async createOrder (@Body() createOrderDto: CreateOrderDto): Promise<Order> {
        return await this.orderService.createOrder(createOrderDto)
    }

    @Roles(Role.Admin)
    @UseGuards(AuthGuard, RoleGuard)
    @Put('update-order/:orderId')
    @ApiBody({type: UpdateOrderDto})
    @ApiResponse({
        status: 201,
        description: 'update order',
        type: User
    })
    @ApiResponse({
        status: 400,
        description: 'Bad request'
    })
    @ApiResponse({
        status: 401,
        description: 'Unauthorized'
    })
    @ApiResponse({
        status: 403,
        description: 'Forbidden'
    })
    async updateOrder (
        @Param('orderId') orderId,
        @Body() updateOrderDto: UpdateOrderDto
    ) {
        return await this.orderService.updateOrder(orderId, updateOrderDto)
    }

    @Roles(Role.Admin)
    @UseGuards(AuthGuard, RoleGuard)
    @Delete('delete-order/:orderId')
    @ApiParam({name: 'orderId', description: 'order id'})
    @ApiResponse({
        status: 200,
        description: 'delete order',
    })
    @ApiResponse({
        status: 400,
        description: 'Bad request'
    })
    @ApiResponse({
        status: 401,
        description: 'Unauthorized'
    })
    @ApiResponse({
        status: 403,
        description: 'Forbidden'
    })
    @ApiResponse({
        status: 404,
        description: 'Not found'
    })
    async deleteOrder (@Param('orderId') orderId) {
        return await this.orderService.deleteOrder(orderId)
    }

    @UseGuards(AuthGuard)
    @Get('get-user-orders/:userId')
    @ApiParam({name: 'userId', description: 'user id'})
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
    async getUserOrders (@Param('userId') userId): Promise<Order[]> {
        return await this.orderService.getUserOrders(userId)
    }

    @Roles(Role.Admin)
    @UseGuards(AuthGuard, RoleGuard)
    @Get('get-all-orders')
    @ApiResponse({
        status: 200,
        description: 'get all orders',
        type: [Order]
    })
    @ApiResponse({
        status: 401,
        description: 'Unauthorized'
    })
    async getAllOrders (): Promise<Order[]> {
        return await this.orderService.getAllOrders()
    }
}