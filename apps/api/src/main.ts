import { NestFactory } from '@nestjs/core'
import { AppModule } from './app.module'
import { FastifyAdapter } from '@nestjs/platform-fastify'
import { ValidationPipe } from '@nestjs/common'

async function bootstrap() {
  const app = await NestFactory.create(AppModule, new FastifyAdapter())

  // Security headers
  app.use((_req: any, res: any, next: any) => {
    res.setHeader('X-Content-Type-Options', 'nosniff')
    res.setHeader('X-Frame-Options', 'DENY')
    res.setHeader('Referrer-Policy', 'strict-origin-when-cross-origin')
    next()
  })

  app.enableCors({
    origin: process.env.APP_URL,
    credentials: true,
  })

  app.useGlobalPipes(new ValidationPipe({ whitelist: true, forbidNonWhitelisted: true }))

  await app.listen(4000, '0.0.0.0')
  console.log(`API running on :4000`)
}

bootstrap()
