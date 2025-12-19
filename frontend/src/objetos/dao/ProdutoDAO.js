const API_URL = '/api/produto'; 

class ProdutoDAO {
  async listar() {
    try {
      const response = await fetch(API_URL);
      if (!response.ok) throw new Error('Erro ao listar produtos');
      return await response.json();
    } catch (error) {
      console.error(error);
      return [];
    }
  }

  async gravar(produto) {
    try {
      // Se o produto já tem _id, o destino é /api/produto/ID e o método é PUT
      const isEdicao = produto._id;
      const url = isEdicao ? `/api/produto/${produto._id}` : '/api/produto';
      const method = isEdicao ? 'PUT' : 'POST';
  
      const response = await fetch(url, {
        method: method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(produto),
      });
  
      if (!response.ok) throw new Error('Erro na comunicação com o servidor');
      return await response.json();
    } catch (error) {
      console.error("Erro no gravar:", error);
      return null;
    }
  }

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

export default ProdutoDAO;