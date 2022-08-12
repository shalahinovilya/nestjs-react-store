export interface CreateProduct {
    id?: number
    categoryId: number;
    userId: number;
    title: string;
    description: string;
    price: number;
    img: string;
}