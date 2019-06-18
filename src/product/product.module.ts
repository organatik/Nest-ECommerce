import {Module} from '@nestjs/common';
import {ProductController} from './product.controller';
import {ProductService} from './product.service';
import {MongooseModule} from '@nestjs/mongoose';
import {ProductSchema} from '../models/product.shema';


@Module({
    imports: [
        MongooseModule.forFeature([{name: 'Product', schema: ProductSchema}]),
    ],
    controllers: [ProductController],
    providers: [ProductService],
})
export class ProductModule {
}
