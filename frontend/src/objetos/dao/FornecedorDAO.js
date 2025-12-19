const API_URL = '/api/fornecedor'; // Caminho relativo para Vercel

class FornecedorDAO {
  async listar() {
    try {
      const response = await fetch(API_URL);
      if (!response.ok) throw new Error('Erro ao listar fornecedores');
      return await response.json();
    } catch (error) {
      console.error(error);
      return [];
    }
  }

  async gravar(fornecedor) {
    try {
      // Se tiver _id, usa PUT (edição), senão usa POST (criação)
      const isEdicao = fornecedor._id;
      const url = isEdicao ? `${API_URL}/${fornecedor._id}` : API_URL;
      const method = isEdicao ? 'PUT' : 'POST';

      const response = await fetch(url, {
        method: method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(fornecedor),
      });
      return await response.json();
    } catch (error) {
      console.error(error);
      return null;
    }
  }

  async excluir(id) {
    try {
      const response = await fetch(`${API_URL}/${id}`, { method: 'DELETE' });
      return response.ok;
    } catch (error) {
      console.error(error);
      return false;
    }
  }
}

export default FornecedorDAO;