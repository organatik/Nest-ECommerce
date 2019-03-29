import {Allow, IsNotEmpty, MinLength} from 'class-validator';

export interface LoginDto {
    userName: string;
    password: string;
}

export class RegisterDTO {
    @MinLength(5)
    userName: string;

    @MinLength(8)
    password: string;

    @IsNotEmpty()
    seller: boolean;

    @Allow()
    address: {
        city: string;
        street: string;
        apartment?: string;
    };
}
