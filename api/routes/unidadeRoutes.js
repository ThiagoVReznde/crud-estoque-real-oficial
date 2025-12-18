import express from 'express';
// IMPORTANTE: Confira se o arquivo na pasta 'dao' começa com Maiúscula mesmo!
import UnidadeDAO from '../dao/UnidadeDAO.js'; 

const router = express.Router();
const dao = new UnidadeDAO();

// GET: Listar todas
router.get('/', async (req, res) => {
  try {
    const lista = await dao.listar();
    res.json(lista);
  } catch (err) {
    // Se der erro no banco, avisa o frontend em JSON
    res.status(500).json({ error: 'Erro ao buscar unidades' });
  }
});

// POST: Criar nova
router.post('/', async (req, res) => {
  try {
    const novo = await dao.salvar(req.body);
    res.status(201).json(novo);
  } catch (err) {
    res.status(500).json({ error: 'Erro ao salvar unidade: ' + err.message });
  }
});

// DELETE: Excluir
router.delete('/:id', async (req, res) => {
    try {
      await dao.excluir(req.params.id);
      // CORREÇÃO: Mudei de 'Produto' para 'Unidade'
      res.json({ mensagem: 'Unidade excluída com sucesso' }); 
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
});

export default router;