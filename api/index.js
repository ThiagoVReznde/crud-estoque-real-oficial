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

// 1. CONEXÃO IMEDIATA (Sem bloquear)
// Na Vercel, conectamos assim que o arquivo carrega.
// O connect.js garante que não vai abrir conexões duplicadas.
connectDB();

app.get(['/', '/api'], (req, res) => {
  res.send('Backend do Estoque Rodando! 🚀');
});

// 2. CORREÇÃO DAS ROTAS (Adicionado /api)
// Como o vercel.json redireciona "/api/...", o Express recebe a URL completa.
// Precisamos incluir o prefixo /api aqui para casar.
app.use('/api/produto', produtoRoutes);
app.use('/api/unidade', unidadeRoutes);
app.use('/api/fornecedor', fornecedorRoutes);

// 3. INICIALIZAÇÃO CONDICIONAL
// Se estiver rodando no seu PC (Node), ele faz o listen.
// Se estiver na Vercel, ele ignora isso e apenas exporta o app.
if (process.env.NODE_ENV !== 'production') {
  const PORT = process.env.PORT || 3000;
  app.listen(PORT, () => {
    console.log(`💻 Servidor rodando LOCALMENTE na porta ${PORT}`);
  });
}

app.use((req, res) => {
  res.status(404).json({
    erro: 'Rota não encontrada',
    caminho_que_voce_tentou: req.originalUrl, // <--- ISSO VAI NOS DIZER A VERDADE
    metodo: req.method
  });
});

// 4. EXPORTAÇÃO OBRIGATÓRIA
export default app;