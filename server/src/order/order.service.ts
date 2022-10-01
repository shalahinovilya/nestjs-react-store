import {Inject, Injectable} from "@nestjs/common";
import {CartService} from "../cart/cart.service";
import {CreateOrderDto} from "./dto/create-order.dto";
import {Order} from "./order.entity";
import {UpdateOrderDto} from "./dto/update-order.dto";


@Injectable()
export class OrderService {

    constructor(
        @Inject('ORDER_PROVIDER')
        private orderRepository,
        private cartService: CartService) {}


    async createOrder (dto: CreateOrderDto): Promise<Order> {
        const cart = await this.cartService.getOrCreateCart(dto.userId)
        const order = await this.orderRepository.create({...dto, cartId: cart.id})
        await this.cartService.makeCartIsOrder(cart.id)
        return order
    }

    async updateOrder (orderId, dto: UpdateOrderDto) {
        return await this.orderRepository.update({
            firstName: dto.firstName,
            lastName: dto.lastName,
            phone: dto.phone,
            address: dto.address,
            deliveryType: dto.deliveryType
        }, {where: {id: orderId}})
    }

    async deleteOrder (orderId) {
        return await this.orderRepository.destroy({where: {id: orderId}})
    }

    async getUserOrders (userId): Promise<Order[]> {
        return await this.orderRepository.findAll({where : {userId: userId}})
    }

    async getAllOrders (): Promise<Order[]> {
        return await this.orderRepository.findAll()
    }
}