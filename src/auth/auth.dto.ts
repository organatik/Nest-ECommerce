import {Allow, IsBoolean, IsNotEmpty, MinLength, ValidateIf} from 'class-validator';

export interface LoginDto {
    userName: string;
    password: string;
}

export class RegisterDTO {
    @IsNotEmpty() @IsBoolean()
    seller: boolean;

    @ValidateIf((seller) => seller.seller === false)
    @MinLength(5)
    userName: string;

    @MinLength(8)
    password: string;

    @Allow()
    address: {
        city: string;
        street: string;
        apartment?: string;
    };
}
