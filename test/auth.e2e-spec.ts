import 'dotenv/config';
import {app} from './constants';
import * as mongoose from 'mongoose';
import * as request from 'supertest';
import {HttpStatus} from '@nestjs/common';
import {LoginDto, RegisterDTO} from '../src/auth/auth.dto';

beforeAll(async () => {
    await mongoose.connect(process.env.MONGO_URI, {useNewUrlParser: true});
    await mongoose.connection.db.dropDatabase();
});

afterAll(async (done) => {
    await mongoose.disconnect(done);
});

describe('Auth', () => {

    const sellerRegister: RegisterDTO = {
        userName: 'seller',
        password: 'password',
        address: {
            city: 'kiev',
            street: 'amosova',
        },
        seller: true,
    };

    it('should register user', () => {
        const user: RegisterDTO = {
            userName: 'username',
            password: 'password',
            address: {
                city: 'kiev',
                street: 'amosova',
            },
            seller: false,
        };

        return request(app)
            .post('/auth/register')
            .set('Accept', 'application/json')
            .send(user)
            .expect(({body}) => {
                expect(body.token).toBeDefined();
                expect(body.user.userName).toEqual('username');
                expect(body.user.password).toBeUndefined();
                expect(body.user.seller).toBeFalsy();
            })
            .expect(HttpStatus.CREATED);
    });

    it('should register seller', () => {
        const user: RegisterDTO = {
            userName: 'username',
            password: 'password',
            address: {
                city: 'kiev',
                street: 'amosova',
            },
            seller: true,
        };

        return request(app)
            .post('/auth/register')
            .set('Accept', 'application/json')
            .send(sellerRegister)
            .expect(({body}) => {
                expect(body.token).toBeDefined();
                expect(body.user.userName).toEqual('seller');
                expect(body.user.password).toBeUndefined();
                expect(body.user.seller).toBeTruthy();
            })
            .expect(HttpStatus.CREATED);
    });

    it('reject duplicate registration', () => {
        const user: RegisterDTO = {
            userName: 'username',
            password: 'password',
            address: {
                city: 'kiev',
                street: 'amosova',
            },
            seller: false,
        };

        return request(app)
            .post('/auth/register')
            .set('Accept', 'application/json')
            .send(user)
            .expect((res) => {
                expect(res.body.message).toEqual('User already exists');
            })
            .expect(HttpStatus.BAD_REQUEST);
    });
});

describe('Login', () => {
    it('should login user', () => {
        const user: LoginDto = {
            userName: 'username',
            password: 'password',
        };

        return request(app)
            .post('/auth/login')
            .set('Accept', 'application/json')
            .send(user)
            .expect((res) => {
                expect(res.body.token).toBeDefined();
                expect(res.body.user.userName).toEqual('username');
                expect(res.body.user.password).toBeUndefined();
                expect(res.body.user.seller).toBeFalsy();
                expect(res.status).toEqual(HttpStatus.CREATED);
            })
            .expect(HttpStatus.CREATED);
    });

    it('should login seller', () => {
        const sellerRegister: LoginDto = {
            userName: 'seller',
            password: 'password',
        };

        return request(app)
            .post('/auth/login')
            .set('Accept', 'application/json')
            .send(sellerRegister)
            .expect((res) => {
                expect(res.body.token).toBeDefined();
                expect(res.body.user.userName).toEqual('seller');
                expect(res.body.user.password).toBeUndefined();
                expect(res.status).toEqual(HttpStatus.CREATED);
                expect(res.body.user.seller).toBeTruthy();
            })
            .expect(HttpStatus.CREATED);
    });
});
