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

  async salvar(produtoData) {
    // Lógica Inteligente: Se vier objeto completo, cria antes. Se vier ID, só usa.
    
    // 1. Trata Unidade
    if (produtoData.unidade && typeof produtoData.unidade === 'object' && !produtoData.unidade._id) {
        const novaUnidade = await Unidade.create(produtoData.unidade);
        produtoData.unidade = novaUnidade._id;
    }

    // 2. Trata Fornecedor
    if (produtoData.fornecedor && typeof produtoData.fornecedor === 'object' && !produtoData.fornecedor._id) {
        const novoFornecedor = await Fornecedor.create(produtoData.fornecedor);
        produtoData.fornecedor = novoFornecedor._id;
    }

    const produto = new Produto(produtoData);
    return await produto.save();
  }

  async atualizar(id, novosDados) {
    // Mesma lógica de verificação (simplificada para exemplo)
    return await Produto.findByIdAndUpdate(id, novosDados, { new: true });
  }

  async excluir(id) {
    return await Produto.findByIdAndDelete(id);
  }
}

export default ProdutoDAO;