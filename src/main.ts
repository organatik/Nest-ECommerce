import 'dotenv/config';
import {NestFactory} from '@nestjs/core';
import {ValidationPipe} from '@nestjs/common';
import {AppModule} from './app.module';

if (process.env.NODE_ENV === 'test') {
    process.env.MONGO_URI = process.env.MONGO_URI_TEST;
    console.log('~~~~~~~~~~~~~TESTING IN PROCESS~~~~~~~~~~~~~~~~~~');
}

async function bootstrap() {
    const app = await NestFactory.create(AppModule);
    app.useGlobalPipes(new ValidationPipe({
        transform: true,
        whitelist: true,
        forbidNonWhitelisted: true,
    }));
    await app.listen(process.env.PORT || 3000);
}

bootstrap();
