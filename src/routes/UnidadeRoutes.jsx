import express from 'express';
import UnidadeDAO from '../dao/unidadeDAO.js';

const router = express.Router();
const dao = new UnidadeDAO();

// GET: Lista todas
router.get('/', async (req, res) => {
  try {
    const lista = await dao.listar();
    res.json(lista);
  } catch (err) {
    res.status(500).json({ erro: err.message });
  }
});

// POST: Cria nova
router.post('/', async (req, res) => {
  try {
    const salvo = await dao.salvar(req.body);
    res.status(201).json(salvo);
  } catch (err) {
    res.status(500).json({ erro: err.message });
  }
});

// PUT: Atualiza
router.put('/:id', async (req, res) => {
  try {
    const atualizado = await dao.atualizar(req.params.id, req.body);
    res.json(atualizado);
  } catch (err) {
    res.status(500).json({ erro: err.message });
  }
});

// DELETE: Remove
router.delete('/:id', async (req, res) => {
  try {
    await dao.excluir(req.params.id);
    res.json({ mensagem: 'Unidade removida com sucesso' });
  } catch (err) {
    res.status(500).json({ erro: err.message });
  }
});

export default router;
