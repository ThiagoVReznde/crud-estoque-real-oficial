import Produto from './models/produto.js';
import Fornecedor from './models/fornecedor.js';
import Unidade from './models/unidade.js';

class ProdutoDAO {
  async listar() {
    return await Produto.find()
      .populate('fornecedor')
      .populate('unidade')
      .sort({ nome: 1 });
  }

  async salvar(id, produtoData) {
    // tratamento Unidade (Se for objeto novo, cria; se for string, é ID)
    if (produtoData.unidade && typeof produtoData.unidade === 'object' && !produtoData.unidade._id) {
        const novaUnidade = await Unidade.create(produtoData.unidade);
        produtoData.unidade = novaUnidade._id;
    }

    // tratamento Fornecedor (Se for objeto novo, cria)
    if (produtoData.fornecedor && typeof produtoData.fornecedor === 'object' && !produtoData.fornecedor._id) {
        const novoFornecedor = await Fornecedor.create(produtoData.fornecedor);
        produtoData.fornecedor = novoFornecedor._id;
    }

    // verifica se id existe
    if (id && id !== "null") {
        // Modo Edição: Atualiza o existente e retorna o novo objeto
        return await Produto.findByIdAndUpdate(id, produtoData, { new: true });
    } else {
        // Modo Criação: Cria um novo
        const produto = new Produto(produtoData);
        return await produto.save();
    }
}

  async excluir(id) {
    return await Produto.findByIdAndDelete(id);
  }
}

export default ProdutoDAO;