import { Product } from "./product.model";

export interface Entry {
    id: number;
    name: string;
    quantity: number;
    product: Product
}