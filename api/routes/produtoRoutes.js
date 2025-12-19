import express from 'express';
import ProdutoDAO from '../dao/ProdutoDAO.js'; // Ajuste o caminho se necessário

const router = express.Router();
const dao = new ProdutoDAO();

router.get('/', async (req, res) => {
  try {
    const lista = await dao.listar();
    res.json(lista);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.post('/', async (req, res) => {
  try {
    const novo = await dao.salvar(req.body);
    res.status(201).json(novo);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.put('/:id', async (req, res) => {
  try {
    const atualizado = await dao.atualizar(req.params.id, req.body);
    res.json(atualizado);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.delete('/:id', async (req, res) => {
  await dao.excluir(req.params.id);
  res.json({ mensagem: 'Removido com sucesso!' });
});


export default router;