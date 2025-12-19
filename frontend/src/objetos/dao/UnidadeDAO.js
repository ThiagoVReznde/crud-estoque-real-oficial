const API_URL = '/api/unidade';

class UnidadeDAO {
  async listar() {
    try {
      const response = await fetch(API_URL);
      if (!response.ok) throw new Error('Erro ao listar unidades');
      return await response.json();
    } catch (error) {
      console.error(error);
      return [];
    }
  }

async gravar(unidade) {
  try {
    const isEdicao = unidade._id; 
    const url = isEdicao ? `/api/unidade/${unidade._id}` : '/api/unidade';
    const method = isEdicao ? 'PUT' : 'POST';

    const response = await fetch(url, {
      method: method,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(unidade),
    });

    if (!response.ok) throw new Error('Erro ao processar unidade');
    return await response.json();
  } catch (error) {
    console.error("Erro no gravar unidade:", error);
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

export default UnidadeDAO;