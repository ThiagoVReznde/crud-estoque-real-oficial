import express from 'express';
import FornecedorDAO from '../dao/FornecedorDAO.js'; // Cuidado com Maiúsculas/minúsculas

const router = express.Router();
const dao = new FornecedorDAO();

router.get('/', async (req, res) => {
  const lista = await dao.listar();
  res.json(lista);
});

router.post('/', async (req, res) => {
  const novo = await dao.salvar(req.body); // Note que no Backend o método costuma ser 'salvar' e no front 'gravar', verifique seu DAO de backend
  res.status(201).json(novo);
});

// TEM QUE TER ISSO PARA O EXCLUIR DO FRONTEND FUNCIONAR:
router.delete('/:id', async (req, res) => {
  try {
    await dao.excluir(req.params.id);
    res.json({ mensagem: 'Fornecedor excluído' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

export default router;