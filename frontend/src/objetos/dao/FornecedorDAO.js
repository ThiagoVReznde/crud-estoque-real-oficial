const API_URL = 'https://crud-estoque-real-oficial.vercel.app/api/fornecedor'; 

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

  // --- ADICIONADO AGORA ---
  async excluir(id) {
    try {
      const response = await fetch(`${API_URL}/${id}`, { 
        method: 'DELETE' 
      });
      
      if (!response.ok) throw new Error('Erro ao excluir fornecedor');
      
      return true;
    } catch (error) {
      console.error(error);
      return false;
    }
  }
}

export default FornecedorDAO;