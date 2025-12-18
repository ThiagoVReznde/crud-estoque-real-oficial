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
      const response = await fetch(API_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(unidade),
      });
      return await response.json();
    } catch (error) {
      console.error(error);
      return null;
    }
  }
}

export default UnidadeDAO;