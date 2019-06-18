import { ApiModelProperty } from '@nestjs/swagger';
import {IsNotEmpty, MinLength} from 'class-validator';

export class LoginDto {
    @ApiModelProperty({
        minLength: 5,
    })
    @MinLength(5)
    @IsNotEmpty()
    userName: string;

    @ApiModelProperty({
        minLength: 8,
    })
    @MinLength(8)
    @IsNotEmpty()
    password: string;
}
