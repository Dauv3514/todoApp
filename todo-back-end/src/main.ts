import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // 🔐 Activer la validation globale (déjà dans ton code)
  app.useGlobalPipes(new ValidationPipe());

  app.enableCors();

  // 📄 Configuration de Swagger
  const config = new DocumentBuilder()
    .setTitle('Nom de ton API')
    .setDescription("Description de l'API")
    .setVersion('1.0')
    .addBearerAuth(
      {
        type: 'http',
        scheme: 'bearer',
        bearerFormat: 'JWT',
        name: 'JWT',
        description: 'Enter JWT Token',
        in: 'header',
      },
      'JWT-auth', // ← Ceci est le nom de la stratégie d'authentification
    )
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document); // Swagger dispo sur /api

  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
