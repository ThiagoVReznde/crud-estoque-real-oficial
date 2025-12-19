import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import { connectDB } from './database/connect.js';

import produtoRoutes from './routes/produtoRoutes.js';
import unidadeRoutes from './routes/unidadeRoutes.js';
import fornecedorRoutes from './routes/fornecedorRoutes.js';

dotenv.config();

const app = express();
app.use(express.json());
app.use(cors());

// tenta coneccao imediatamente
connectDB();

app.get(['/', '/api'], (req, res) => {
  res.send('Backend do Estoque Rodando! 🚀');
});

app.use((req, res, next) => {
  console.log(`Recebi: ${req.method} ${req.url}`);
  next();
});

// nao tenho ctz qual ele usa entao mantenho as duas
app.use(['/api/produto', '/produto'], produtoRoutes);
app.use(['/api/unidade', '/unidade'], unidadeRoutes);
app.use(['/api/fornecedor', '/fornecedor'], fornecedorRoutes);

export default app;