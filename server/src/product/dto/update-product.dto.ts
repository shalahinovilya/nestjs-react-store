export class UpdateProductDto {
    title: string;
    description: string;
    price: number;
    img?: string;
    userId: number;
    categoryId: number;
}