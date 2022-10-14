import { NestFactory } from "@nestjs/core"
import { AppModule } from "./app.module"
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import * as session from "express-session"
import * as passport from "passport"


async function bootstrap() {

//Crea instancia de AppModule

  const app = await NestFactory.create(AppModule)
  app.use(
    session({
      secret: "keyboard",
      resave: false,
      saveUninitialized: false,
    })
  )

//Crea Instancia de Swagger

  const config = new DocumentBuilder()
    .setTitle('Cats example')
    .setDescription('The cats API description')
    .setVersion('1.0')
    .addTag('cats')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);
  

//Crea una Instancia de Passport

  app.use(passport.initialize())
  app.use(passport.session())
  

//Abre el Puerto

  await app.listen(3000)
}
bootstrap()