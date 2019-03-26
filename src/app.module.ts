import {Module, ValidationPipe} from '@nestjs/common';
import {DatabaseModule} from './database/database.module';
import {AppController} from './app.controller';
import {AppService} from './app.service';
import {SharedModule} from './shared/shared.module';
import {AuthModule} from './auth/auth.module';
import {APP_PIPE} from '@nestjs/core';

const validationProvider = {
    provide: APP_PIPE, useClass: ValidationPipe, multi: true,
};

@Module({
    imports: [DatabaseModule, SharedModule, AuthModule],
    controllers: [AppController],
    providers: [AppService, validationProvider],
})
export class AppModule {
}
