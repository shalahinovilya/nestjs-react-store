export interface CreateComment {
    id?: number;
    limitations: string;
    advantages: string;
    content: string;
    userId: number;
    productId: number;
}