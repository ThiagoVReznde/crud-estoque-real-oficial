import express from 'express';
import FornecedorDAO from '../dao/FornecedorDAO.js';

const router = express.Router();
const dao = new FornecedorDAO();

// LISTAR (GET)
router.get('/', async (req, res) => {
  const lista = await dao.listar();
  res.json(lista);
});

// CRIAR (POST)
router.post('/', async (req, res) => {
  const novo = await dao.salvar(req.body); 
  res.status(201).json(novo);
});

// O :id na URL identifica qual fornecedor será alterado
router.put('/:id', async (req, res) => {
  try {
    const id = req.params.id;
    const dadosAtualizados = req.body;
    
    // Certifique-se que seu DAO no BACKEND tem um método 'atualizar' ou 'salvar' que aceite o ID
    const resultado = await dao.salvar(id, dadosAtualizados); 
    
    if (resultado) {
      res.json(resultado);
    } else {
      res.status(404).json({ erro: "Fornecedor não encontrado" });
    }
  } catch (erro) {
    res.status(500).json({ erro: "Erro ao atualizar fornecedor" });
  }
});

// EXCLUIR (DELETE)
router.delete('/:id', async (req, res) => {
  await dao.excluir(req.params.id);
  res.json({ mensagem: 'Removido com sucesso!' });
});

export default router;