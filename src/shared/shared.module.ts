import {Module, ValidationPipe} from '@nestjs/common';
import {UserService} from './user.service';
import {MongooseModule} from '@nestjs/mongoose';
import {UserSchema} from '../models/userSchema';
import {APP_PIPE} from '@nestjs/core';

const validationProvider = {
    provide: APP_PIPE, useClass: ValidationPipe, multi: true,
};

@Module({
    imports: [
        MongooseModule.forFeature([{name: 'User', schema: UserSchema}]),
    ],
    providers: [
        UserService,
        validationProvider,
    ],
    exports: [UserService],
})
export class SharedModule {

}
