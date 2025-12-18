import express from 'express';
import ProdutoDAO from '../dao/ProdutoDAO.js'; // Ajuste o caminho se necessário

const router = express.Router();
const dao = new ProdutoDAO();

// GET: Lista todos os produtos
// URL final: /api/produto/
router.get('/', async (req, res) => {
  try {
    const lista = await dao.listar();
    res.json(lista);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// POST: Cria um novo produto (com fornecedor/unidade embutidos ou IDs)
router.post('/', async (req, res) => {
  try {
    const novo = await dao.salvar(req.body);
    res.status(201).json(novo);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// PUT: Atualiza pelo ID
// URL final: /api/produto/:id
router.put('/:id', async (req, res) => {
  try {
    const atualizado = await dao.atualizar(req.params.id, req.body);
    res.json(atualizado);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// DELETE: Remove pelo ID
router.delete('/:id', async (req, res) => {
  try {
    await dao.excluir(req.params.id);
    res.json({ mensagem: 'Produto excluído com sucesso' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

export default router;