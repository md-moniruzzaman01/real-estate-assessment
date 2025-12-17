import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { PrismaService } from './prisma/prisma.service';
import { ValidationPipe } from '@nestjs/common';
import { IoAdapter } from '@nestjs/platform-socket.io';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Enable CORS for HTTP requests
  app.enableCors({
    origin: [
      "http://localhost:8081", // Expo Web
      "http://localhost:3000", // Next.js frontend
    ],
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
    credentials: true,
  });

  // Use Socket.IO adapter for real-time communication
  app.useWebSocketAdapter(new IoAdapter(app));

  app.enableShutdownHooks();

  // Prisma setup
  const prisma = app.get(PrismaService);
  try {
    await prisma.$connect();
    console.log('✅ Database connected successfully');
  } catch (err: any) {
    console.error('❌ Failed to connect to database:', err.message);
    process.exit(1);
  }

  // Global validation pipe
  app.useGlobalPipes(new ValidationPipe({ whitelist: true, forbidNonWhitelisted: true }));

  const port = process.env.PORT ?? 5000;
  await app.listen(port);

  console.log(`🚀 Server is listening on http://localhost:${port}`);
}

bootstrap();
