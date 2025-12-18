const API_URL = '/api/fornecedor'; 

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
      const response = await fetch(API_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(fornecedor),
      });
      return await response.json();
    } catch (error) {
      console.error(error);
      return null;
    }
  }
}

export default FornecedorDAO;