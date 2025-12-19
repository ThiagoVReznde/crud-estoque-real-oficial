import express from 'express';
import ProdutoDAO from '../dao/ProdutoDAO.js';

const router = express.Router();
const dao = new ProdutoDAO();

// LISTAR (GET)
router.get('/', async (req, res) => {
  const lista = await dao.listar();
  res.json(lista);
});

// CRIAR (POST)
router.post('/', async (req, res) => {
  try {
    const novo = await dao.salvar(null, req.body);
    res.status(201).json(novo);
  } catch (err) {
    res.status(500).json({ erro: err.message });
  }
});

// EDITAR (PUT)
router.put('/:id', async (req, res) => {
  try {
    const id = req.params.id;
    const dados = req.body;
    // Passamos o ID da URL e os dados do corpo
    const atualizado = await dao.salvar(id, dados);
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