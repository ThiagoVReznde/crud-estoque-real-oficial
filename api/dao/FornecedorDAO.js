import Fornecedor from './models/fornecedor.js';

class FornecedorDAO {
  async listar() {
    return await Fornecedor.find().sort({ nome: 1 });
  }

  async salvar(dados) {
    if (id) {
      // Procura pelo ID e atualiza os dados existentes
      return await Fornecedor.findByIdAndUpdate(id, dados, { new: true });
    } else {
      // Cria um novo registro
      return await Fornecedor.create(dados);
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