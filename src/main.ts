import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { ValidationPipe } from '@nestjs/common';
import { json } from 'body-parser';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors();
  app.useGlobalPipes(new ValidationPipe({ transform: true }));
  app.use(json({ limit: '50mb' }));
  app.setGlobalPrefix('api/v1'); const options = new DocumentBuilder()
    .setTitle('Sales-Assignment API DOC')
    .setDescription('Sales-Assignment API DESCRIPTION')
    .setVersion('1.0')
    .addTag('Sales-Assignment')
    .addBearerAuth()
    .build();
  const document = SwaggerModule.createDocument(app, options);
  SwaggerModule.setup('api-doc', app, document);
  await app.listen(3000);
}
bootstrap();
