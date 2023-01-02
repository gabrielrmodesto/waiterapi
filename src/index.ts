import path from 'node:path';
import express from 'express';
import mongoose from 'mongoose';
import { router } from './router';

mongoose.connect('mongodb+srv://gabrielrmodesto5:pLt3fDJzKJ5DUUU@orderappjs.uy6lgcf.mongodb.net/?retryWrites=true&w=majority')
  .then(() => {
    const app = express();

    app.use((req, res, next) => {
      res.setHeader('Access-Control-Allow-Origin', '*');
      res.setHeader('Access-Control-Allow-Methods', '*');
      res.setHeader('Access-Control-Allow-Headers', '*');

      next();
    });

    app.use('/uploads', express.static(path.resolve(__dirname, '..', 'uploads')));
    app.use(express.json());
    app.use(router);

    app.listen(3001, () => {
      console.log('conectado');
    });
  })
  .catch(() => console.log('erro conexao'));
