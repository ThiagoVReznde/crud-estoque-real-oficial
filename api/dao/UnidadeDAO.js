import Unidade from './models/unidade.js';

class UnidadeDAO {
  async listar() {
    return await Unidade.find().sort({ nome: 1 });
  }

  // api/dao/UnidadeDAO.js
  async salvar(id, dados) {
    if (id && id !== 'null' && id !== 'undefined') {
      // Modo Edição: Localiza e atualiza
      return await Unidade.findByIdAndUpdate(id, dados, { new: true });
    } else {
      // Modo Criação: Novo registro
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