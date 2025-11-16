import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Config } from '../../config/default.properties';
import express from 'express';
import session from 'express-session';
import { join } from 'path';

async function bootstrap() {
  const server = express();
  const config = Config.getInstance();

  // Trusted proxy
  if (config.entornoApp === 'pro' || config.entornoApp === 'pru') {
    server.set('trust proxy', true);
  }
  const app = await NestFactory.create(AppModule);
 /*  app.setGlobalPrefix('api'); */
  app.enableCors(); // importante para pruebas con frontend local

  // Crea la session de express
  app.use(
    session({
      key: config.getProperty('session.name'),
      secret: config.getProperty('session.secret'),
      cookie: config.getProperty('session.cookie'),
      resave: false,
      saveUninitialized: false,
    }),
  );


  // Middleware para SPA: cualquier ruta que no sea /api devuelve index.html
    app.use('/', (req, res, next) => {

    console.log('originalUrl: '+req.originalUrl);
    if (!req.originalUrl.startsWith('/api')) {
        console.log('client: '+join(__dirname, '../../../', 'client',req.originalUrl));
    //    res.sendFile(join(__dirname, '../../', 'client', req.originalUrl));
     } else {
        console.log('API: '+req.originalUrl);
       
     }
      next();

  });  
 
  await app.listen(3000);
  console.log('API running on http://localhost:3000'); 
}
bootstrap();
