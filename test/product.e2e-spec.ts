import * as mongoose from 'mongoose';
import axios from 'axios';
import * as request from 'supertest';
import {RegisterDTO} from '../src/auth/auth.dto';
import {app} from './constants';
import {CreateProductDTO} from '../src/product/product.dto';
import {HttpStatus} from '@nestjs/common';

let sellerToken: string;

const productSeller: RegisterDTO = {
    seller: true,
    userName: 'productSeller',
    password: 'password',
};

beforeAll(async () => {
    await mongoose.connect(process.env.MONGO_URI, {useCreateIndex: true, useNewUrlParser: true});
    await mongoose.connection.db.dropDatabase();

    const {data: {token}} = await axios.post(`${app}/auth/register`, productSeller);
    sellerToken = token;
});

afterAll(async (done) => {
    await mongoose.disconnect(done);
});

describe('PRODUCT', () => {

    const product: CreateProductDTO = {
        title: 'Siberia 80 Degrees WD Extremely Strong ',
        description: 'Perhaps it is fair to warn a little bit about this one, the Siberia -80 Degrees White Dry Portion is ' +
            'the strongest and most powerful Swedish snus on the market today and is not a product for the weak or the ' +
            'snus novice! It has an insane 42mg/g which is basically twice as much as other strong products out there ' +
            'and 5 times stronger than a regular 8mg/g snus. When it comes to flavour you will be surprised at how ' +
            'nicely they have blended a dark and full tobacco taste with a sharp mint flavour.',
        image: 'https://www.snusline.com/media/catalog/product/cache/1/thumbnail/600x/17f82f742ffe127f42dca9de82fb58b1' +
            '/s/i/siberia_white_dry_portion_dosa.png',
        price: 200,
        brand: 'Siberia',
        strength: 'Extremely Strong ',
        nicotine: 43,
        pouches: 15,
        size: 'Normal',
        types: 'White Dry',
    };

    let productId: string;

    it('should list all product', () => {
        return request(app)
            .get('/product')
            .expect(({body}) => {
                console.log(body, 'BODY');
            });
    });

    it('should create product', () => {
        return request(app)
            .post('/product')
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${sellerToken}`)
            .send(product)
            .expect(({body}) => {
                expect(body._id).toBeDefined();
                productId = body._id;
                expect(body.title).toEqual(product.title);
                expect(body.description).toEqual(product.description);
                expect(body.image).toEqual(product.image);
                expect(body.price).toEqual(product.price);
                expect(body.brand).toEqual(product.brand);
                expect(body.strength).toEqual(product.strength);
                expect(body.nicotine).toEqual(product.nicotine);
                expect(body.pouches).toEqual(product.pouches);
                expect(body.size).toEqual(product.size);
                expect(body.types).toEqual(product.types);
            })
            .expect(HttpStatus.CREATED);

    });


    it('should read product', () => {

        return request(app)
            .get(`/product/${productId}`)
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${sellerToken}`)
            .send(product)
            .expect(({body}) => {
                expect(body._id).toEqual(productId);
                expect(body.title).toEqual(product.title);
                expect(body.description).toEqual(product.description);
                expect(body.image).toEqual(product.image);
                expect(body.price).toEqual(product.price);
                expect(body.brand).toEqual(product.brand);
                expect(body.strength).toEqual(product.strength);
                expect(body.nicotine).toEqual(product.nicotine);
                expect(body.pouches).toEqual(product.pouches);
                expect(body.size).toEqual(product.size);
                expect(body.types).toEqual(product.types);
            })
            .expect(HttpStatus.OK);
    });

    it('should update product', () => {
        return request(app)
            .put(`/product/${productId}`)
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${sellerToken}`)
            .send({title: 'new TITLE'})
            .expect(({body}) => {
                expect(body._id).toEqual(productId);
                expect(body.title).not.toEqual(product.title);
                expect(body.description).toEqual(product.description);
                expect(body.image).toEqual(product.image);
                expect(body.price).toEqual(product.price);
                expect(body.brand).toEqual(product.brand);
                expect(body.strength).toEqual(product.strength);
                expect(body.nicotine).toEqual(product.nicotine);
                expect(body.pouches).toEqual(product.pouches);
                expect(body.size).toEqual(product.size);
                expect(body.types).toEqual(product.types);
            })
            .expect(HttpStatus.OK);
    });

    it('should delete product', async () => {
        await axios.delete(`${app}/product/${productId}`, {
            headers: {Authorization: `Bearer ${sellerToken}`},
        });

        return request(app)
            .get(`/product/${productId}`)
            .expect(HttpStatus.NOT_FOUND);
    });
});
