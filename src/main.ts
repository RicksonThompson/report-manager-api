import { ValidationPipe } from '@nestjs/common'
import { NestFactory } from '@nestjs/core'
import { AppModule } from './modules/app.module'
import * as cors from 'cors'

async function bootstrap() {
  const app = await NestFactory.create(AppModule)
  app.use(cors({
    allowedHeaders: "*",
    origin: "*"
  }))
  app.useGlobalPipes(new ValidationPipe())
  await app.listen(process.env.PORT || 8081, () =>
    console.log(`service on in ${process.env.PORT || 8081}`),
  )
}
bootstrap()
