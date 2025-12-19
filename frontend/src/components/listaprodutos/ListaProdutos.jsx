import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import ProdutoDAO from '../../objetos/dao/ProdutoDAO';

const ListaProdutos = () => {
  const [produtos, setProdutos] = useState([]);
  const navigate = useNavigate(); // Hook para mudar de página
  const dao = new ProdutoDAO();

  const carregarProdutos = async () => {
    const dados = await dao.listar();
    setProdutos(dados);
  };

  useEffect(() => {
    carregarProdutos();
  }, []);

  const excluirProduto = async (id) => {
    if (window.confirm('Deseja realmente excluir este produto?')) {
      await dao.excluir(id);
      carregarProdutos();
    }
  };

  return (
    <div className="space-y-6">
      {/* CABEÇALHO DA PÁGINA COM O BOTÃO NOVO */}
      <div className="flex justify-between items-center border-b border-slate-200 pb-5">
        <div>
          <h2 className="text-2xl font-bold text-slate-800">📦 Estoque de Produtos</h2>
          <p className="text-slate-500 text-sm font-medium">Gerencie os itens disponíveis no sistema</p>
        </div>

        {/* O BOTÃO QUE ESTAVA FALTANDO AQUI */}
        <button 
          onClick={() => navigate('/produto/novo')} 
          className="bg-blue-600 text-white px-6 py-3 rounded-xl font-bold hover:bg-blue-700 shadow-lg shadow-blue-100 transition-all flex items-center gap-2 active:scale-95"
        >
          <span className="text-xl">+</span> Novo Produto
        </button>
      </div>

      {/* GRID DE PRODUTOS */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {produtos.map((prod) => (
          <div key={prod._id} className="bg-white border border-slate-200 rounded-2xl p-5 shadow-sm hover:shadow-md transition-shadow">
            <div className="flex justify-between items-start mb-4">
              <h3 className="text-lg font-bold text-slate-900">{prod.nome}</h3>
              <span className="bg-blue-100 text-blue-700 text-xs font-bold px-2 py-1 rounded uppercase">
                {prod.unidade?.sigla || 'un'}
              </span>
            </div>

            <div className="text-sm text-slate-600 space-y-1 mb-6">
              <p><span className="font-semibold italic">Fornecedor:</span> {prod.fornecedor?.nome || 'Não informado'}</p>
              <p><span className="font-semibold italic">Qtd:</span> {prod.quantidade}</p>
            </div>

            <div className="flex gap-2 border-t pt-4 border-slate-100">
              <button 
                onClick={() => navigate(`/produto/editar/${prod._id}`)}
                className="flex-1 text-blue-600 hover:bg-blue-50 py-2 rounded-lg font-bold transition-colors"
              >
                Editar
              </button>
              <button 
                onClick={() => excluirProduto(prod._id)}
                className="flex-1 text-red-600 hover:bg-red-50 py-2 rounded-lg font-bold transition-colors"
              >
                Excluir
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* MENSAGEM CASO VAZIO */}
      {produtos.length === 0 && (
        <div className="text-center py-20 bg-slate-50 rounded-3xl border-2 border-dashed border-slate-200">
          <p className="text-slate-400 font-medium">Nenhum produto cadastrado ainda.</p>
        </div>
      )}
    </div>
  );
};

export default ListaProdutos;