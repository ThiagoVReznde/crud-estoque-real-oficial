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
      const response = await fetch(API_URL, {
        method: 'POST', // Backend inteligente decide se cria fornecedor/unidade ou só vincula
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(produto),
      });
      return await response.json();
    } catch (error) {
      console.error(error);
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