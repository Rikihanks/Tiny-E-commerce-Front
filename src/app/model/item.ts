export interface Item {
    id: number;
    itemName: string;
    itemPrice: number;
    itemPictureUrl: string;
    description: string;
    numberOfUnits?: number;
    category: string;
}