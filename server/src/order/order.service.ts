import {Inject, Injectable} from "@nestjs/common";
import {CartService} from "../cart/cart.service";
import {CreateOrderDto} from "./dto/create-order.dto";

@Injectable()
export class OrderService {
    constructor(
        @Inject('ORDER_PROVIDER')
        private orderRepository,
        private cartService: CartService) {}

    async createOrder (dto: CreateOrderDto) {
        const cart = await this.cartService.getOrCreateCart(dto.userId)
        const order = await this.orderRepository.create({...dto, cartId: cart.id})
        await this.cartService.makeCartIsOrder(cart.id)
        return order

    }

    async getUserOrders (userId) {
        return await this.orderRepository.findAll({where : {userId: userId}})
    }
}