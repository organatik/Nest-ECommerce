import {Module, ValidationPipe} from '@nestjs/common';
import {UserService} from './user.service';
import {MongooseModule} from '@nestjs/mongoose';
import {UserSchema} from '../models/userSchema';
import {APP_FILTER, APP_INTERCEPTOR, APP_PIPE} from '@nestjs/core';
import {HttpExceptionFilter} from './htttp-exception.filter';
import {LoggingInterceptor} from './logging.interceptor';

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
        {
            provide: APP_FILTER,
            useClass: HttpExceptionFilter,
        },
        {
            provide: APP_INTERCEPTOR,
            useClass: LoggingInterceptor,
        },
    ],
    exports: [UserService],
})
export class SharedModule {

}
