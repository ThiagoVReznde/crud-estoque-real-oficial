import express from 'express';
import UnidadeDAO from '../dao/UnidadeDAO.js';

const router = express.Router();
const dao = new UnidadeDAO();

router.get('/', async (req, res) => {
  const lista = await dao.listar();
  res.json(lista);
});

router.post('/', async (req, res) => {
  const novo = await dao.salvar(req.body);
  res.status(201).json(novo);
});

router.delete('/:id', async (req, res) => {
    try {
      await dao.excluir(req.params.id);
      res.json({ mensagem: 'Produto excluído com sucesso' });
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  });
// ... Adicione PUT e DELETE se precisar ...

export default router;