import express from 'express';
import UnidadeDAO from '../dao/UnidadeDAO.js'; 

const router = express.Router();
const dao = new UnidadeDAO();

// GET: Listar todas
router.get('/', async (req, res) => {
  try {
    const lista = await dao.listar();
    res.json(lista);
  } catch (err) {
    res.status(500).json({ error: 'Erro ao buscar unidades' });
  }
});

// api/routes/unidadeRoutes.js
router.post('/', async (req, res) => {
  try {
    const novo = await dao.salvar(null, req.body); 
    res.status(201).json(novo);
  } catch (err) {
    res.status(500).json({ erro: err.message });
  }
});

router.put('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const atualizado = await dao.salvar(id, req.body); 
    res.json(atualizado);
  } catch (err) {
    res.status(500).json({ erro: err.message });
  }
});

// DELETE: Remover
router.delete('/:id', async (req, res) => {
    try {
      await dao.excluir(req.params.id);
      res.json({ mensagem: 'Unidade excluída com sucesso' }); 
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
});

export default router;