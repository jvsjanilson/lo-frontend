import { ItemInterface } from "./ItemInterface";

export interface CompraInterface {
    id: number;
    user: string;
    items : ItemInterface[];
    created_at: string;
    total_items: number;
}