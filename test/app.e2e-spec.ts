import 'dotenv/config';
import * as request from 'supertest';
import {RegisterDTO} from '../src/auth/auth.dto';
import {HttpStatus} from '@nestjs/common';

const app = 'http://localhost:3000';

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
            userName: 'username123123',
            password: 'password321123123',
            address: {
                city: 'kiev',
                street: 'amosova',
            },
        };

        return request(app)
            .post('/auth/register')
            .set('Accept', 'application/json')
            .send(user)
            .expect(({body}) => {
                console.log(body);
            })
            .expect(HttpStatus.CREATED);
    });
});
