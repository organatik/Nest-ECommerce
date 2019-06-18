import {Body, Controller, Delete, Get, Param, Post, Put, UseGuards, UsePipes, ValidationPipe} from '@nestjs/common';
import {ProductService} from './product.service';
import {CreateProductDTO} from './product.dto';
import {AuthGuard} from '@nestjs/passport';
import {SellerGuard} from '../guards/seller.guard';
import {User} from '../utilities/user.decorator';
import {User as UserDocument} from '../types/user';
import {ApiUseTags, ApiBearerAuth } from '@nestjs/swagger';
import {UpdateProductDTO} from './product-update.dto';

@ApiUseTags('product')
@Controller('product')
export class ProductController {
    constructor(private productService: ProductService) {
    }

    @Get()
    async listAll() {
        return this.productService.findAll();
    }

    @Post()
    @ApiBearerAuth()
    @UseGuards(AuthGuard('jwt'), SellerGuard)
    @UsePipes(new ValidationPipe({
        transform: true,
        whitelist: true,
        forbidNonWhitelisted: true,
    }))
    async create(@Body() product: CreateProductDTO, @User() user: UserDocument) {
        return this.productService.create(product, user);
    }

    @Get(':id')
    async read(@Param('id') id: string) {
        return this.productService.findOne(id);
    }

    @Put(':id')
    @ApiBearerAuth()
    @UseGuards(AuthGuard('jwt'), SellerGuard)
    @UsePipes(new ValidationPipe({
        transform: true,
        whitelist: true,
        forbidNonWhitelisted: true,
    }))
    async update(@Param('id') id: string, @Body() product: UpdateProductDTO) {
        return this.productService.update(id, product);
    }

    @Delete(':id')
    @ApiBearerAuth()
    @UseGuards(AuthGuard('jwt'), SellerGuard)
    async delete(@Param('id') id: string) {
        return this.productService.delete(id);
    }
}
