import Unidade from './models/unidade.js';

class UnidadeDAO {
  async listar() {
    return await Unidade.find().sort({ nome: 1 });
  }

  // Na pratica, try/catch nunca pegou um dos
  // problemas que tive mas ok
  async salvar(id, dados) {
    try{
    // verifica se id existe
      if (id && id !== 'null') {
        // PUT
        return await Unidade.findByIdAndUpdate(id, dados, { new: true });
      } else {
        // POST
        return await Unidade.create(dados);
      }
    } catch (error){
      throw new Error("Erro no banco de dados: " + error.message);
    }
  }

  async excluir(id) {
    return await Unidade.findByIdAndDelete(id);
  }
}

export default UnidadeDAO;