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

router.delete('/:id', async (req, res) => {
  await dao.excluir(req.params.id);
  res.json({ mensagem: 'Removido com sucesso!' });
});


export default router;