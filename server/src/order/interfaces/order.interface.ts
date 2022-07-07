export interface CreateOrder {
    firstName: string;
    lastName: string;
    phone: string;
    address: string;
    buyingType: string;
    comment?: string;
    userId: number;
    cartId: number;
}