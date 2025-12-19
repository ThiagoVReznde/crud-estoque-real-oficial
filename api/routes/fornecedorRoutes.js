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
  try {
    // Passamos 'null' para o ID, pois é um novo registro
    const novo = await dao.salvar(null, req.body); 
    res.status(201).json(novo);
  } catch (err) {
    res.status(500).json({ erro: err.message });
  }
});

// PUT (Edição)
router.put('/:id', async (req, res) => {
  try {
    const id = req.params.id;
    const dados = req.body;
    // Passamos o ID da URL e os dados do corpo
    const atualizado = await dao.salvar(id, dados); 
    
    if (!atualizado) {
      return res.status(404).json({ erro: "Fornecedor não encontrado" });
    }
    res.json(atualizado);
  } catch (err) {
    res.status(500).json({ erro: err.message });
  }
});

// EXCLUIR (DELETE)
router.delete('/:id', async (req, res) => {
  await dao.excluir(req.params.id);
  res.json({ mensagem: 'Removido com sucesso!' });
});

export default router;