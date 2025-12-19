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

// CRIAR (POST)
router.post('/', async (req, res) => {
  try {
    const novo = await dao.salvar(null, req.body); // Primeiro param é null
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
    const atualizado = await dao.salvar(id, dados); // Passa ID e Dados
    res.json(atualizado);
  } catch (err) {
    res.status(500).json({ erro: err.message });
  }
});

router.delete('/:id', async (req, res) => {
  await dao.excluir(req.params.id);
  res.json({ mensagem: 'Removido com sucesso!' });
});


export default router;