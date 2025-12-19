import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import FornecedorDAO from '../../objetos/dao/FornecedorDAO';

const ListaFornecedores = () => {
  const [fornecedores, setFornecedores] = useState([]);
  const navigate = useNavigate();
  const dao = new FornecedorDAO();

  const carregar = async () => setFornecedores(await dao.listar());

  useEffect(() => {
    carregar();
  }, []);

  const excluir = async (id) => {
    if (window.confirm('Deseja remover este fornecedor?')) {
      await dao.excluir(id);
      carregar();
    }
  };

  return (
    // Container externo com mx-auto para centralizar todo o bloco
    <div className="max-w-5xl mx-auto space-y-6">
      
      {/* HEADER ALINHADO COM A TABELA */}
      <div className="flex justify-between items-center border-b border-slate-200 pb-5">
        <div>
          <h2 className="text-2xl font-bold text-slate-800">🚚 Fornecedores</h2>
          <p className="text-slate-500 text-sm">Gestão de parceiros e empresas</p>
        </div>
        <button 
          onClick={() => navigate('/fornecedor/novo')} 
          className="bg-blue-600 text-white px-5 py-2.5 rounded-xl font-bold hover:bg-blue-700 shadow-md transition-all active:scale-95"
        >
          + Novo Fornecedor
        </button>
      </div>

      {/* TABELA CENTRALIZADA COM mx-auto */}
      <div className="bg-white border border-slate-200 rounded-2xl overflow-hidden shadow-sm mx-auto w-full">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            {/* ... thead e tbody mantidos igual ao anterior */}
          </table>
        </div>
      </div>
    </div>
  );
};

export default ListaFornecedores;