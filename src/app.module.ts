import {Module} from '@nestjs/common';
import {DatabaseModule} from './database/database.module';
import {AppController} from './app.controller';
import {AppService} from './app.service';
import {SharedModule} from './shared/shared.module';
import {AuthModule} from './auth/auth.module';

@Module({
    imports: [DatabaseModule, SharedModule, AuthModule],
    controllers: [AppController],
    providers: [AppService],
})
export class AppModule {
}

