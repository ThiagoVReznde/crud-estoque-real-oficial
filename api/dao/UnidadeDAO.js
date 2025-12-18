import Unidade from './models/unidade.js';

class UnidadeDAO {
  async listar() {
    return await Unidade.find().sort({ nome: 1 });
  }

  async salvar(dados) {
    const novaUnidade = new Unidade(dados);
    return await novaUnidade.save();
  }

  async atualizar(id, dados) {
    return await Unidade.findByIdAndUpdate(id, dados, { new: true });
  }

  async excluir(id) {
    return await Unidade.findByIdAndDelete(id);
  }
}

export default UnidadeDAO;