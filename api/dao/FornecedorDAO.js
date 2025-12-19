import Fornecedor from './models/fornecedor.js';

class FornecedorDAO {
  async listar() {
    return await Fornecedor.find().sort({ nome: 1 });
  }

  async salvar(id, dados) {
    try {
      // verifica se id existe
      if (id && id !== 'null') {
        // PUT
        return await Fornecedor.findByIdAndUpdate(id, dados, { new: true });
      } else {
        // POST
        return await Fornecedor.create(dados);
      }
    } catch (error) {
      throw new Error("Erro no banco de dados: " + error.message);
    }
  }

  async excluir(id) {
    return await Fornecedor.findByIdAndDelete(id);
  }
}

export default FornecedorDAO;