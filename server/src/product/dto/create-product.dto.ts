export class CreateProductDto {
    title: string;
    description: string;
    price: number;
    userId: number;
    categoryId: number;
    img?: string;
}