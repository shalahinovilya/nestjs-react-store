import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import {CustomValidationPipe} from "./pipe/validation.pipe";
import {DocumentBuilder, SwaggerModule} from "@nestjs/swagger";
import * as compression from 'compression';
import helmet from "helmet";

async function bootstrap() {

  const PORT = process.env.PORT || 4999

  const app = await NestFactory.create(AppModule, {
    logger: ['error', 'warn'],
    cors: true,
  });

  app.use(helmet({
    crossOriginEmbedderPolicy: false,
    crossOriginResourcePolicy: false,
  }));

  app.use(compression({
    filter: () => { return true },
    threshold: 0
  }));

  const config = new DocumentBuilder()
      .setTitle('Shop API')
      .setDescription('The shop API description')
      .setVersion('1.0')
      .addTag('shop')
      .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  app.useGlobalPipes(new CustomValidationPipe())

  await app.listen(PORT, () => console.log(`Server has started on PORT ${PORT}`));

}

bootstrap();
