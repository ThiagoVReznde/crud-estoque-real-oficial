// src/objetos/dao/ProdutoDAO.js
const API_URL = 'http://localhost:3000/produto';

export default class ProdutoDAO {
  // Método para buscar todos (GET)
  async listar() {
    try {
      const response = await fetch(API_URL);
      if (!response.ok) throw new Error('Erro ao buscar dados');
      return await response.json();
    } catch (error) {
      console.error(error);
      return [];
    }
  }

  // Método para criar (POST)
  async gravar(produto) {
    try {
      const response = await fetch(API_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(produto),
      });
      return await response.json();
    } catch (error) {
      console.error(error);
      return null;
    }
  }

  // Método para excluir (DELETE)
  async excluir(id) {
    try {
      await fetch(`${API_URL}/${id}`, { method: 'DELETE' });
      return true;
    } catch (error) {
      console.error(error);
      return false;
    }
  }
}
