import {Order} from "./order.entity";

export const OrderProvider = [
    {
        provide: 'ORDER_PROVIDER',
        useValue: Order
    }
]