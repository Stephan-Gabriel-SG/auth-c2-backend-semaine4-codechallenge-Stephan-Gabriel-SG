import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Swagger configuration
  const config = new DocumentBuilder()
    .setTitle('API Mini-Bibliothèque')
    .setDescription(
      `Cette API permet de gérer une bibliothèque virtuelle : livres, utilisateurs, emprunts, bibliothèques et disponibilité des ouvrages.`,
    )
    .setVersion('1.0.0')
    .addServer('http://localhost:3000', 'Serveur local de développement')
    .addTag('Users', 'Gestion des utilisateurs')
    .addTag('Books', 'Catalogue des livres et filtres')
    .addTag('Loans', 'Système de prêt et de retour')
    .addTag('Libraries', 'Gestion des bibliothèques')
    .build();

  const documentFactory = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, documentFactory);

  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
    }),
  );
  await app.listen(process.env.PORT ?? 3000);
}

bootstrap().catch((err) => {
  console.error('Error during bootstrapping:', err);
  process.exit(1);
});
