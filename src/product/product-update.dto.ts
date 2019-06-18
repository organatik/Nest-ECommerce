import {Allow } from 'class-validator';
import {ApiModelPropertyOptional} from '@nestjs/swagger';

export class UpdateProductDTO {
    @ApiModelPropertyOptional()
    @Allow()
    title: string;

    @ApiModelPropertyOptional()
    @Allow()
    description: string;

    @ApiModelPropertyOptional()
    @Allow()
    image: string;

    @ApiModelPropertyOptional()
    @Allow()
    price: number;

    @ApiModelPropertyOptional()
    @Allow()
    brand: string;

    @ApiModelPropertyOptional()
    @Allow()
    strength: string;

    @ApiModelPropertyOptional()
    @Allow()
    nicotine: number;

    @ApiModelPropertyOptional()
    @Allow()
    pouches: number;

    @ApiModelPropertyOptional()
    @Allow()
    size: string;

    @ApiModelPropertyOptional()
    @Allow()
    types: string;
}
