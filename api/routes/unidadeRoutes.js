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

// POST: Criar nova
router.post('/', async (req, res) => {
  try {
    const novo = await dao.salvar(null, req.body); // null como ID
    res.status(201).json(novo);
  } catch (err) {
    res.status(500).json({ error: 'Erro ao salvar unidade: ' + err.message });
  }
});

// PUT
router.put('/:id', async (req, res) => {
  try {
    const id = req.params.id; // Captura o ID da URL
    const dados = req.body;
    
    // Chama o salvar passando o ID para indicar atualização
    const atualizado = await dao.atualizar(id, dados);
    
    if (atualizado) {
      res.json(atualizado);
    } else {
      res.status(404).json({ error: 'Unidade não encontrada' });
    }
  } catch (err) {
    res.status(500).json({ error: 'Erro ao editar unidade: ' + err.message });
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