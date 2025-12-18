import Fornecedor from './models/fornecedor.js';

class FornecedorDAO {
  async listar() {
    return await Fornecedor.find().sort({ nome: 1 });
  }

  async salvar(dados) {
    const novoFornecedor = new Fornecedor(dados);
    return await novoFornecedor.save();
  }

  async atualizar(id, dados) {
    return await Fornecedor.findByIdAndUpdate(id, dados, { new: true });
  }

  async excluir(id) {
    return await Fornecedor.findByIdAndDelete(id);
  }
}

export default FornecedorDAO;