import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import { connectDB } from './backend/database/connect.js';

// --- IMPORTAÇÕES DAS ROTAS ---
import produtoRoutes from './backend/routes/produtoRoutes.js';
import unidadeRoutes from './backend/routes/unidadeRoutes.js'; // <--- ADICIONE ISSO
import fornecedorRoutes from './backend/routes/fornecedorRoutes.js'; // <--- ADICIONE ISSO

dotenv.config();

const app = express();
app.use(express.json());
app.use(cors());

// --- DEFINIÇÃO DAS URLs ---
app.get('/', (req, res) => res.send('Backend rodando!'));

app.use('/produto', produtoRoutes);
app.use('/unidade', unidadeRoutes); // <--- ADICIONE ISSO
app.use('/fornecedor', fornecedorRoutes); // <--- ADICIONE ISSO

const PORT = process.env.PORT || 3000;

const startServer = async () => {
  try {
    console.log('Iniciando o servidor...');
    await connectDB();
    app.listen(PORT, () => {
      console.log(`Servidor rodando na porta ${PORT}`);
    });
  } catch (error) {
    console.error('Erro fatal:', error);
    process.exit(1);
  }
};

startServer();

export default app;
