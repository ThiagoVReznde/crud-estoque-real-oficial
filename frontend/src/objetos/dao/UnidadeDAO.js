const API_URL = '/api/unidade'; 

class UnidadeDAO {
  
  // LISTAR (GET)
  async listar() {
    try {
      const response = await fetch(API_URL);
      
      // Se a resposta for HTML (erro 404/500 da Vercel) em vez de JSON,
      // o response.json() daria erro. Verificamos o ok antes.
      if (!response.ok) throw new Error('Erro ao listar unidades');
      
      return await response.json();
    } catch (error) {
      console.error("Erro no listar:", error);
      return [];
    }
  }

  // GRAVAR (POST)
  async gravar(unidade) {
    try {
      const response = await fetch(API_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(unidade),
      });
      
      if (!response.ok) throw new Error('Erro ao salvar unidade');

      return await response.json();
    } catch (error) {
      console.error("Erro no gravar:", error);
      return null;
    }
  }

  // --- NOVO MÉTODO: EXCLUIR (DELETE) ---
  async excluir(id) {
    try {
      // Note que passamos o ID na URL: /api/unidade/123
      const response = await fetch(`${API_URL}/${id}`, {
        method: 'DELETE',
      });

      if (!response.ok) throw new Error('Erro ao excluir unidade');
      
      return true; // Retorna verdadeiro se deu certo
    } catch (error) {
      console.error("Erro no excluir:", error);
      return false;
    }
  }
}

export default UnidadeDAO;