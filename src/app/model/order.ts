 export interface Order {
    id: number;
    
    country: string;

    address: string;

    creditCardNumber: string;

    userId: number;

    processed: boolean;

    itemIds: number [] ;

    postalCode: string;
 }