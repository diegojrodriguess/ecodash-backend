import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { ValidationPipe } from '@nestjs/common';
import { HateoasInterceptor } from './common/interceptors/hateoas.interceptor';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe({ whitelist: true, forbidNonWhitelisted: true }));
  app.useGlobalInterceptors(new HateoasInterceptor());
  app.enableCors({
    origin: 'http://localhost:3001', 
  });

  const config = new DocumentBuilder()
    .setTitle('Ecodash API')
    .setDescription('API for managing researchers and projects')
    .setVersion('1.0')
    .addTag('Projects')
    .addTag('Researchers')
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document); 

  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
