import { Item } from './item';
import { UserLoggedIn } from './userLoggedin';

export interface OrderIn {
    id: number;
    
    country: string;

    address: string;

    creditCardNumber: string;

    user: UserLoggedIn;

    processed: boolean;

    items: Item [] ;

    postalCode: string;
}