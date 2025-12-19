// src/components/listaprodutos/ListaProdutos.jsx
import React, { useEffect, useState } from 'react';
import ProdutoDAO from '../../objetos/dao/ProdutoDAO';

const ListaProdutos = () => {
  const [produtos, setProdutos] = useState([]);
  const dao = new ProdutoDAO();

  useEffect(() => { carregarProdutos(); }, []);

  const carregarProdutos = async () => {
    const dados = await dao.listar();
    setProdutos(dados);
  };

  const excluirProduto = async (id) => {
    if (window.confirm('Tem certeza que deseja remover este item do estoque?')) {
      await dao.excluir(id);
      carregarProdutos();
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center border-b pb-4">
        <h2 className="text-2xl font-bold text-slate-800">Produtos em Estoque</h2>
        <span className="bg-slate-100 text-slate-600 px-3 py-1 rounded-full text-sm font-semibold">
          Total: {produtos.length} itens
        </span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {produtos.map((prod) => (
          <div key={prod._id} className="group bg-white border border-slate-200 rounded-xl overflow-hidden hover:border-blue-400 hover:shadow-lg transition-all">
            <div className="p-5">
              <div className="flex justify-between items-start mb-4">
                <h3 className="text-lg font-bold text-slate-900 group-hover:text-blue-600 transition-colors capitalize">
                  {prod.nome}
                </h3>
                <span className="bg-blue-100 text-blue-700 text-xs font-bold px-2.5 py-1 rounded uppercase tracking-wider">
                  {prod.unidade?.sigla || 'un'}
                </span>
              </div>
              
              <div className="space-y-2 mb-6">
                <div className="flex items-center text-sm text-slate-600">
                  <span className="w-24 font-medium italic">Fornecedor:</span>
                  <span className="text-slate-900 font-semibold truncate">{prod.fornecedor?.nome || 'Não definido'}</span>
                </div>
                <div className="flex items-center text-sm text-slate-600">
                  <span className="w-24 font-medium italic">Quantidade:</span>
                  <span className={`font-bold ${prod.quantidade < 10 ? 'text-red-500' : 'text-slate-900'}`}>
                    {prod.quantidade}
                  </span>
                </div>
              </div>

              <div className="flex gap-2">
                <button 
                  onClick={() => excluirProduto(prod._id)}
                  className="flex-1 bg-red-50 text-red-600 hover:bg-red-600 hover:text-white py-2 rounded-lg text-sm font-bold transition-all border border-red-100"
                >
                  🗑️ Excluir
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ListaProdutos;