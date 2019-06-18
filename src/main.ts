import 'dotenv/config';
import {NestFactory} from '@nestjs/core';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import {AppModule} from './app.module';

if (process.env.NODE_ENV === 'test') {
    process.env.MONGO_URI = process.env.MONGO_URI_TEST;
    console.log('~~~~~~~~~~~~~TESTING IN PROCESS~~~~~~~~~~~~~~~~~~');
}

async function bootstrap() {
    const app = await NestFactory.create(AppModule);
    app.setGlobalPrefix('api');
    const options = new DocumentBuilder()
        .setTitle('Snusik ECommerce')
        .setDescription('The Snusik API description')
        .setVersion('1.0')
        .setBasePath('api')
        .addTag('Snusik')
        .addBearerAuth('Authorization', 'header')
        .build();
    const document = SwaggerModule.createDocument(app, options);
    SwaggerModule.setup('api-doc', app, document);
    await app.listen(process.env.PORT || 3000);
}

bootstrap();
