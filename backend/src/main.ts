import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { PrismaService } from './prisma/prisma.service';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.enableShutdownHooks();

  // Get PrismaService
  const prisma = app.get(PrismaService);

  try {
    // Connect to DB explicitly to log status
    await prisma.$connect();
    console.log('✅ Database connected successfully');
  } catch (err) {
    console.error('❌ Failed to connect to database:', err.message);
    process.exit(1);
  }

  const port = process.env.PORT ?? 5000;
  await app.listen(port);

  console.log(`🚀 Server is listening on http://localhost:${port}`);
}

bootstrap();

