import express from 'express';
import FornecedorDAO from '../dao/FornecedorDAO.js';

const router = express.Router();
const dao = new FornecedorDAO();

router.get('/', async (req, res) => {
  const lista = await dao.listar();
  res.json(lista);
});

router.post('/', async (req, res) => {
  const novo = await dao.salvar(req.body);
  res.status(201).json(novo);
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
    try {
      await dao.excluir(req.params.id);
      res.json({ mensagem: 'Produto excluído com sucesso' });
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  });

export default router;