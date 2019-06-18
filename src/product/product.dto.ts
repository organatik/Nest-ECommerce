import {ApiModelProperty} from '@nestjs/swagger';
import {IsNotEmpty} from 'class-validator';

export class CreateProductDTO {
    @ApiModelProperty()
    @IsNotEmpty()
    title: string;

    @ApiModelProperty()
    @IsNotEmpty()
    description: string;

    @ApiModelProperty()
    @IsNotEmpty()
    image: string;

    @ApiModelProperty()
    @IsNotEmpty()
    price: number;

    @ApiModelProperty()
    @IsNotEmpty()
    brand: string;

    @ApiModelProperty()
    @IsNotEmpty()
    strength: string;

    @ApiModelProperty()
    @IsNotEmpty()
    nicotine: number;

    @ApiModelProperty()
    @IsNotEmpty()
    pouches: number;

    @ApiModelProperty()
    @IsNotEmpty()
    size: string;

    @ApiModelProperty()
    @IsNotEmpty()
    types: string;
}
