import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import {CustomValidationPipe} from "./pipe/validation.pipe";

async function bootstrap() {

  const PORT = process.env.PORT || 4999

  const app = await NestFactory.create(AppModule);

  app.useGlobalPipes(new CustomValidationPipe())

  await app.listen(PORT, () => console.log(`Server has started on PORT ${PORT}`));
}

bootstrap();
