import express from 'express';
import UnidadeDAO from '../dao/UnidadeDAO.js'; 

const router = express.Router();
const dao = new UnidadeDAO();

// LISTAR (GET)
router.get('/', async (req, res) => {
  const lista = await dao.listar();
  res.json(lista);
});

// CRIAR (POST)
router.post('/', async (req, res) => {
  try {
    const novo = await dao.salvar(null, req.body); 
    res.status(201).json(novo);
  } catch (err) {
    res.status(500).json({ erro: err.message });
  }
});

// EDITAR (PUT)
router.put('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const atualizado = await dao.salvar(id, req.body); 
    // Passamos o ID da URL e os dados do corpo
    res.json(atualizado);
  } catch (err) {
    res.status(500).json({ erro: err.message });
  }
});

// EXCLUIR (DELETE)
router.delete('/:id', async (req, res) => {
    try {
      await dao.excluir(req.params.id);
      res.json({ mensagem: 'Unidade excluída com sucesso' }); 
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
});

export default router;