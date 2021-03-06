import {Document} from 'mongoose';

interface Address {
    city: string;
    street: string;
    apartment?: string;
}

export interface User extends Document {
    userName: string;
    readonly password: string;
    seller: boolean;
    address: Address;
    created: Date;
}