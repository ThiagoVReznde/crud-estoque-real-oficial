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

// Permite conexões do seu frontend
app.use(cors({ origin: "*" }));

// --- DEBUGGER (Dedo Duro) ---
// Isso vai mostrar nos logs da Vercel o que está chegando
app.use((req, res, next) => {
  console.log(`[REQUEST] URL: ${req.url} | METHOD: ${req.method}`);
  next();
});

connectDB();

// Rota de Teste da Raiz
app.get(['/', '/api'], (req, res) => {
  res.json({ message: 'Backend do Estoque Rodando!', url_acessada: req.url });
});

// --- DEFINIÇÃO DAS ROTAS ---
// Estamos forçando o prefixo /api aqui.
app.use('/api/produto', produtoRoutes);
app.use('/api/unidade', unidadeRoutes);
app.use('/api/fornecedor', fornecedorRoutes);

// --- ROTA DE ERRO 404 PERSONALIZADA ---
// Se o código chegar aqui, é porque nenhuma rota acima funcionou.
app.use((req, res) => {
  res.status(404).json({
    erro: "Rota não encontrada (404)",
    url_que_o_express_recebeu: req.url, // <--- ISSO É O QUE PRECISAMOS SABER
    path_do_express: req.path,
    metodo: req.method
  });
});

if (process.env.NODE_ENV !== 'production') {
  const PORT = process.env.PORT || 3000;
  app.listen(PORT, () => {
    console.log(`💻 Local server: http://localhost:${PORT}`);
  });
}

export default app;