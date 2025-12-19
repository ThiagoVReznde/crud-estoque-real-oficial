import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import ProdutoDAO from '../../objetos/dao/ProdutoDAO';

const ListaProdutos = () => {
  const [produtos, setProdutos] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const dao = new ProdutoDAO();

  const carregarProdutos = async () => {
    setLoading(true);
    const dados = await dao.listar();
    setProdutos(dados);
    setLoading(false);
  };

  useEffect(() => {
    carregarProdutos();
  }, []);

  const excluirProduto = async (id) => {
    if (window.confirm('Deseja realmente remover este produto do inventário?')) {
      await dao.excluir(id);
      carregarProdutos();
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 py-10 px-4">
      <div className="max-w-6xl mx-auto">
        
        {/* HEADER */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-10">
          <div>
            <h2 className="text-3xl font-extrabold text-slate-800 tracking-tight">Inventário</h2>
            <p className="text-slate-500 font-medium">Controle total de {produtos.length} itens cadastrados</p>
          </div>

          <button 
            onClick={() => navigate('/produto/novo')} 
            className="bg-indigo-600 text-white px-6 py-3.5 rounded-xl font-bold hover:bg-indigo-700 shadow-lg shadow-indigo-200 transition-all flex items-center justify-center gap-2 active:scale-95"
          >
            <span className="text-xl leading-none">+</span> Adicionar Produto
          </button>
        </div>

        {/* CARREGANDO */}
        {loading ? (
          <div className="flex flex-col items-center justify-center py-20 italic text-slate-400">
            <div className="w-8 h-8 border-4 border-indigo-500 border-t-transparent rounded-full animate-spin mb-4"></div>
            Sincronizando estoque...
          </div>
        ) : (
          <>
            {/* GRID DE PRODUTOS */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {produtos.map((prod) => (
                <div 
                  key={prod._id} 
                  className="group bg-white border border-slate-200 rounded-2xl overflow-hidden hover:border-indigo-300 hover:shadow-xl hover:shadow-indigo-50/50 transition-all duration-300"
                >
                  <div className="p-6">
                    {/* Badge e Nome */}
                    <div className="flex justify-between items-start mb-4">
                      <span className="bg-slate-100 text-slate-600 text-[10px] font-black px-2 py-1 rounded-md uppercase tracking-widest border border-slate-200">
                        {prod.unidade?.sigla || 'un'}
                      </span>
                      <div className={`h-2 w-2 rounded-full ${prod.quantidade > 5 ? 'bg-emerald-400' : 'bg-amber-400 animate-pulse'}`}></div>
                    </div>

                    <h3 className="text-xl font-bold text-slate-800 mb-1 group-hover:text-indigo-600 transition-colors">
                      {prod.nome}
                    </h3>
                    <p className="text-xs font-semibold text-slate-400 uppercase tracking-tighter mb-6">
                      Fornecedor: <span className="text-slate-600">{prod.fornecedor?.nome || 'Geral'}</span>
                    </p>

                    {/* Info de Quantidade */}
                    <div className="bg-slate-50 rounded-xl p-4 flex items-center justify-between border border-slate-100">
                      <span className="text-sm font-bold text-slate-500 uppercase tracking-wide">Em estoque: </span>
                      <span className={`text-2xl font-black ${prod.quantidade <= 5 ? 'text-amber-500' : 'text-indigo-600'}`}>
                        {prod.quantidade}
                      </span>
                     
                    </div>
                  </div>
                  <br/>
                  {/* Ações (Aparecem suavemente ou ficam fixas na parte inferior) */}
                  <div className="flex border-t border-slate-100 bg-slate-50/50">
                    <button 
                      onClick={() => navigate(`/produto/editar/${prod._id}`)}
                      className="flex-1 py-4 text-sm font-bold text-slate-600 hover:text-indigo-600 hover:bg-indigo-50 transition-all border-r border-slate-100"
                    >
                     Editar
                    </button>
                    <p>  </p>
                    <button 
                      onClick={() => excluirProduto(prod._id)}
                      className="flex-1 py-4 text-sm font-bold text-slate-400 hover:text-red-600 hover:bg-red-50 transition-all"
                    >
                      Excluir
                    </button>
                  </div>
                </div>
              ))}
            </div>

            {/* MENSAGEM CASO VAZIO */}
            {produtos.length === 0 && (
              <div className="text-center py-24 bg-white rounded-3xl border-2 border-dashed border-slate-200">
                <div className="text-5xl mb-4">📦</div>
                <p className="text-slate-500 font-bold text-lg">Seu estoque está vazio</p>
                <p className="text-slate-400 text-sm mb-6">Comece adicionando seu primeiro produto agora mesmo.</p>
                <button 
                  onClick={() => navigate('/produto/novo')} 
                  className="text-indigo-600 font-bold hover:underline"
                >
                  Cadastrar produto
                </button>
              </div>
            )}
          </>
        )}

        <footer className="mt-12 text-center">
          <p className="text-slate-400 text-xs font-medium uppercase tracking-widest">
            Sistema de Gestão de Materiais • v1.0
          </p>
        </footer>
      </div>
    </div>
  );
};

export default ListaProdutos;