import { CategoryListItem } from "../../category/models/category-list-item.model";

export interface ProductListItem {
    id: number;
    image: string;
    name: string;
    brand: string;
    quantity: number;
    description: string;
    categories: CategoryListItem[]
}