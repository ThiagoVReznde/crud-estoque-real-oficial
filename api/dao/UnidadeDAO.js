import Unidade from './models/unidade.js';

class UnidadeDAO {
  async listar() {
    return await Unidade.find().sort({ nome: 1 });
  }

  async salvar(dados) {
    if (id) {
      // Procura pelo ID e atualiza os dados existentes
      return await Unidade.findByIdAndUpdate(id, dados, { new: true });
    } else {
      // Cria um novo registro
      return await Unidade.create(dados);
    }
  }

  async atualizar(id, dados) {
    return await Unidade.findByIdAndUpdate(id, dados, { new: true });
  }

  async excluir(id) {
    return await Unidade.findByIdAndDelete(id);
  }
}

export default UnidadeDAO;