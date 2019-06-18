import {Allow, IsBoolean, IsNotEmpty, MinLength, ValidateIf} from 'class-validator';
import { ApiModelProperty, ApiModelPropertyOptional } from '@nestjs/swagger';


class Address {
    @ApiModelPropertyOptional()
    @Allow()
    city: string;

    @ApiModelPropertyOptional()
    @Allow()
    street: string;

    @ApiModelPropertyOptional()
    @Allow()
    apartment?: string;
}

export class RegisterDTO {
    @ApiModelProperty()
    @IsNotEmpty() @IsBoolean()
    seller: boolean;

    @ApiModelProperty({
        minLength: 5,
    })
    @ValidateIf((seller) => seller.seller === false)
    @MinLength(5)
    userName: string;

    @ApiModelProperty({
        minLength: 8,
    })
    @MinLength(8)
    password: string;

    @ApiModelPropertyOptional()
    @Allow()
    address?: Address;
}
