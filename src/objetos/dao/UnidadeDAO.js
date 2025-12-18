import Unidade from '../models/unidade.js';

class UnidadeDAO {
  // Listar todas (Ordenado por nome)
  async listar() {
    return await Unidade.find().sort({ nome: 1 });
  }

  // Criar nova
  async salvar(dados) {
    const novaUnidade = new Unidade(dados);
    return await novaUnidade.save();
  }

  // Atualizar
  async atualizar(id, dados) {
    return await Unidade.findByIdAndUpdate(id, dados, { new: true });
  }

  // Excluir
  async excluir(id) {
    return await Unidade.findByIdAndDelete(id);
  }
}

export default UnidadeDAO;
