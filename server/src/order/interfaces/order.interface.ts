export interface CreateOrder {
    firstName: string;
    lastName: string;
    phone: string;
    address: string;
    deliveryType: string;
    comment?: string;
    userId: number;
    cartId: number;
}