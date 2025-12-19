import Fornecedor from './models/fornecedor.js';

class FornecedorDAO {
  async listar() {
    return await Fornecedor.find().sort({ nome: 1 });
  }

  async salvar(id, dados) {
    try {
      // Verificamos se o ID existe e se não é uma string "null" ou "undefined"
      if (id && id !== 'null' && id !== 'undefined') {
        // Edição: Procura pelo ID e atualiza
        return await Fornecedor.findByIdAndUpdate(id, dados, { new: true });
      } else {
        // Criação: Gera um novo registro
        return await Fornecedor.create(dados);
      }
    } catch (error) {
      throw new Error("Erro no banco de dados: " + error.message);
    }
  }

  async atualizar(id, dados) {
    return await Fornecedor.findByIdAndUpdate(id, dados, { new: true });
  }

  async excluir(id) {
    return await Fornecedor.findByIdAndDelete(id);
  }
}

export default FornecedorDAO;