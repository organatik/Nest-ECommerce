import {IsNotEmpty, MinLength} from 'class-validator';

export interface LoginDto {
    userName: string;
    password: string;
}

export class RegisterDTO {
    @IsNotEmpty()
    @MinLength(5)
    userName: string;

    @MinLength(10)
    password: string;

    @IsNotEmpty()
    seller: boolean;

    address: {
        city: string;
        street: string;
        apartment?: string;
    };
}
