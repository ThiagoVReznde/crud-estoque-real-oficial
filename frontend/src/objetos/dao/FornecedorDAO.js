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

// FornecedorDAO.js (Frontend)
async gravar(fornecedor) {
  try {
    // Verifica se existe ID para decidir entre PUT (editar) ou POST (criar)
    const isEdicao = fornecedor._id; 
    const url = isEdicao ? `/api/fornecedor/${fornecedor._id}` : '/api/fornecedor';
    const method = isEdicao ? 'PUT' : 'POST';

    const response = await fetch(url, {
      method: method,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(fornecedor),
    });

    if (!response.ok) throw new Error('Erro ao processar fornecedor');
    
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