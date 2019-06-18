import {HttpException, HttpStatus, Injectable} from '@nestjs/common';
import {InjectModel} from '@nestjs/mongoose';
import {Model} from 'mongoose';
import {Product} from '../types/product';
import {CreateProductDTO} from './product.dto';
import {User} from '../types/user';
import {UpdateProductDTO} from './product-update.dto';

@Injectable()
export class ProductService {
    constructor(@InjectModel('Product') private productModel: Model<Product> ) {}

    async findAll(): Promise<Product[]> {
        const product = await this.productModel.find();
        console.log(await this.productModel.find().populate('owner'));
        return await this.productModel.find().populate('owner');
    }

    async findOne(id: string): Promise<Product> {
        const product = await this.productModel.findById(id).populate('owner');
        if (!product) {
            throw new HttpException('Product does not exist', HttpStatus.NOT_FOUND);
        }

        return product;
    }

    async create(productDTO: CreateProductDTO, user: User): Promise<Product> {
        const product = await this.productModel.create({
            ...productDTO,
            owner: user,
        });
        await product.save();
        return product.populate('owner');
    }

    async update(id: string, productDTO: UpdateProductDTO): Promise<Product> {
        const product = await this.productModel.findById(id);
        await product.update(productDTO);
        return this.productModel.findById(id).populate('owner');
    }

    async delete(id): Promise<Product> {
        const product = await this.productModel.findById(id);
        await product.remove();
        return product.populate('owner');
    }
}
