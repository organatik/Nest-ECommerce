import 'dotenv/config';
import {LoginDto, RegisterDTO} from '../src/auth/auth.dto';
import {HttpStatus} from '@nestjs/common';
import * as request from 'supertest';
import * as mongoose from 'mongoose';

const app = 'http://localhost:3000';

beforeAll(async () => {
    await mongoose.connect(process.env.MONGO_URI, {useNewUrlParser: true});
    await mongoose.connection.db.dropDatabase();
});

afterAll(async (done) => {
    await mongoose.disconnect(done);
});

describe('Root', () => {
    it('should ping', () => {
        return request(app)
            .get('/')
            .expect(200)
            .expect('Hello World!');
    });
});

describe('Auth', () => {
    it('should register', () => {
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
            .send(user)
            .expect(({body}) => {
                console.log(body);
                expect(body.token).toBeDefined();
                expect(body.user.userName).toEqual('username');
                expect(body.user.password).toBeUndefined();
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
                console.log(res.body);
                expect(res.body.message).toEqual('User already exists');
                expect(res.body.statusCode).toEqual(HttpStatus.BAD_REQUEST);
            })
            .expect(HttpStatus.BAD_REQUEST);
    });
});

describe('Login', () => {
    it('should login', () => {
        const user: LoginDto = {
            userName: 'username',
            password: 'password',
        };

        return request(app)
            .post('/auth/login')
            .set('Accept', 'application/json')
            .send(user)
            .expect((res) => {
                console.log(res.body);
                expect(res.body.token).toBeDefined();
                expect(res.body.user.userName).toEqual('username');
                expect(res.body.user.password).toBeUndefined();
                expect(res.status).toEqual(HttpStatus.CREATED);
            })
            .expect(HttpStatus.CREATED);
    });
});
