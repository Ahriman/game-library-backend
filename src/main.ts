import { NestFactory } from '@nestjs/core';
import { Logger, ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const logger = new Logger('Main');

  // Configurar CORS
  app.enableCors({
    origin: [process.env.FRONTEND_URL], // Permitir solo este origen
    methods: 'GET,HEAD,POST,PUT,DELETE,PATCH', // Métodos permitidos
    credentials: true, // Para cookies, autorización, etc.
  });

  // Configuración global de pipes
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true, // Remueve todo lo que no está incluido en los DTOs
      forbidNonWhitelisted: true, // Retorna bad request si hay propiedades en el objeto no requeridas
    }),
  );

  // Documentación Swagger
  const config = new DocumentBuilder()
    .setTitle('Gamelib RESTFul API')
    .setDescription('Gamelib endpoints')
    .setVersion('1.0')
    .addBearerAuth( // Este método define el esquema Bearer
      {
          type: 'http',
          scheme: 'bearer',
          bearerFormat: 'JWT', // Opcional: describe el formato del token
      },
      'access-token', // Nombre de referencia para el esquema
    )
    .build();
    
  const documentFactory = () => SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('', app, documentFactory);

  await app.listen(process.env.PORT ?? 3000);
  logger.log(`Server is running on port ${process.env.PORT}`);
}
bootstrap();
